import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { anchors, excluded, layers, views } from "/layers.js";

/** 动画坐标系：每个视角都是 1200×900，图片按 1.5 倍分辨率渲染 */
const W = 1200;
const H = 900;
const SCALE = 1.5;
const params = new URLSearchParams(location.search);
const only = params.get("view");
const dryRun = params.has("dry");

const log = document.getElementById("log");
const say = (text) => { log.textContent = text; console.log(text); };

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W * SCALE, H * SCALE);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xffffff, 0xffe2cc, 1.9));
const key = new THREE.DirectionalLight(0xffffff, 1.5);
const fill = new THREE.DirectionalLight(0xfff1e6, 0.5);
scene.add(key, fill);

const [gltf, catalog] = await Promise.all([
  new GLTFLoader().loadAsync("/model.glb"),
  fetch("/catalog.json").then((res) => res.json())
]);
const systemsOf = new Map();
for (const system of catalog.systems) {
  for (const id of system.parts) {
    if (!systemsOf.has(id)) systemsOf.set(id, new Set());
    systemsOf.get(id).add(system.id);
  }
}

scene.add(gltf.scene);
gltf.scene.updateMatrixWorld(true);

/** 每个结构：名字、所属系统、包围盒，以及归到哪个图层 */
const parts = [];
gltf.scene.traverse((object) => {
  if (!object.isMesh) return;
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const part = { object, name: object.name, systems: systemsOf.get(object.userData.partId) ?? new Set(), box, center };
  part.layer = excluded(part) ? null : layers.find((layer) => layer.test(part))?.id ?? null;
  parts.push(part);
});

/**
 * 皮肤图层穿一条短裤：骨盆到大腿根这一段皮肤染成短裤的颜色（避开垂在两边的手），
 * 再在两腿之间放一块圆润的裆部，盖住生殖器的轮廓。
 */
function addShorts() {
  const shortsColor = new THREE.Color("#5b8def");
  const hips = unionBox(parts.filter((part) => /^(左|右)侧髋骨$/.test(part.name)));
  const private_ = unionBox(parts.filter((part) => part.systems.has("reproductive") || excluded(part)));
  const top = hips.max.z - 0.035;
  const bottom = private_.min.z - 0.07;
  const centerX = hips.getCenter(new THREE.Vector3()).x;
  const halfWidth = (hips.max.x - hips.min.x) * 0.62;

  const skin = materials.skin;
  skin.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      shortsTop: { value: top }, shortsBottom: { value: bottom },
      shortsX: { value: centerX }, shortsHalf: { value: halfWidth }, shortsColor: { value: shortsColor }
    });
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vBodyPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBodyPos = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vBodyPos;\nuniform float shortsTop, shortsBottom, shortsX, shortsHalf;\nuniform vec3 shortsColor;")
      .replace("#include <color_fragment>", "#include <color_fragment>\nfloat inShorts = step(shortsBottom, vBodyPos.z) * step(vBodyPos.z, shortsTop) * step(abs(vBodyPos.x - shortsX), shortsHalf);\ndiffuseColor.rgb = mix(diffuseColor.rgb, shortsColor, inShorts);")
      .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance = mix(totalEmissiveRadiance, shortsColor * 0.12, inShorts);");
  };

  const size = private_.getSize(new THREE.Vector3());
  const center = private_.getCenter(new THREE.Vector3());
  const crotch = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 48, 32),
    new THREE.MeshStandardMaterial({ color: shortsColor, roughness: 0.62, emissive: shortsColor.clone().multiplyScalar(0.12) })
  );
  crotch.scale.set(size.x + 0.1, 0.05, size.z + 0.1);
  crotch.position.set(center.x, private_.min.y + 0.01, center.z);
  crotch.name = "短裤";
  scene.add(crotch);
  crotch.updateMatrixWorld(true);
  parts.push({ object: crotch, name: "短裤", systems: new Set(["skin"]), box: new THREE.Box3().setFromObject(crotch), center, layer: "skin" });
}

const materials = Object.fromEntries(layers.map((layer) => {
  const color = new THREE.Color(layer.color);
  return [layer.id, new THREE.MeshStandardMaterial({
    color, roughness: 0.62, metalness: 0, side: THREE.DoubleSide,
    emissive: color.clone().multiplyScalar(0.16)
  })];
}));
for (const part of parts) {
  part.object.visible = false;
  if (part.layer) part.object.material = materials[part.layer];
}
addShorts();
for (const part of parts) part.object.visible = false;

const unused = parts.filter((part) => !part.layer).length;
const counts = Object.fromEntries(layers.map((layer) => [layer.id, parts.filter((part) => part.layer === layer.id).length]));
console.log("图层结构数", counts, "未使用", unused);

function unionBox(list) {
  const box = new THREE.Box3();
  for (const part of list) box.union(part.box);
  return box;
}

/** front：相机在 -Y 方向看向 +Y；side：相机在 +X 方向看向 -X（看到身体左侧） */
function cameraFor(view) {
  const fitted = parts.filter((part) => view.fit(part));
  if (!fitted.length) throw new Error(`视角 ${view.id} 没有匹配到结构`);
  const box = unionBox(fitted);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const across = view.dir === "front" ? size.x : size.y;
  const height = Math.max(size.z, (across * H) / W) * view.pad;
  const width = (height * W) / H;
  const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.01, 20);
  camera.up.set(0, 0, 1);
  if (view.dir === "front") {
    camera.position.set(center.x, center.y - 8, center.z);
    key.position.set(center.x - 2, center.y - 6, center.z + 4);
    fill.position.set(center.x + 3, center.y - 4, center.z - 2);
  } else {
    camera.position.set(center.x + 8, center.y, center.z);
    key.position.set(center.x + 6, center.y - 2, center.z + 4);
    fill.position.set(center.x + 4, center.y + 3, center.z - 2);
  }
  camera.lookAt(center);
  camera.updateMatrixWorld(true);
  camera.updateProjectionMatrix();
  return { camera };
}

/** 世界坐标 → 1200×900 的画面坐标 */
function project(camera, box) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
    const p = new THREE.Vector3(x, y, z).project(camera);
    const sx = ((p.x + 1) / 2) * W;
    const sy = ((1 - p.y) / 2) * H;
    x0 = Math.min(x0, sx); y0 = Math.min(y0, sy); x1 = Math.max(x1, sx); y1 = Math.max(y1, sy);
  }
  return [x0, y0, x1, y1].map((v) => Math.round(v));
}

const round = ([x0, y0, x1, y1]) => ({ at: [Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2)], box: [x0, y0, x1, y1] });
const onScreen = ([x0, y0, x1, y1]) => x1 > 0 && y1 > 0 && x0 < W && y0 < H;

function blobOf(canvas) {
  return new Promise((done) => canvas.toBlob(done, "image/webp", 0.86));
}

async function post(url, body) {
  if (dryRun) return;
  const res = await fetch(url, { method: "POST", body });
  if (!res.ok) throw new Error(`${url} 失败：${await res.text()}`);
}

const preview = params.get("preview");
if (preview) {
  const shown = new Set(preview.split(","));
  for (const part of parts) part.object.visible = shown.has(part.layer);
  renderer.render(scene, cameraFor(views.find((view) => view.id === (only ?? "body"))).camera);
  window.atlasDone = { preview, counts, unused };
  say(`预览 ${only ?? "body"}：${preview}`);
  throw new Error("预览模式，不写文件");
}

const atlas = { width: W, height: H, views: {} };
for (const view of views) {
  if (only && view.id !== only) continue;
  const { camera } = cameraFor(view);
  const wanted = view.layers === "all" ? layers.map((layer) => layer.id) : view.layers;
  const entry = { label: view.label, dir: view.dir, layers: {}, anchors: {} };

  for (const layerId of wanted) {
    const members = parts.filter((part) => part.layer === layerId);
    if (!members.length) continue;
    const box = project(camera, unionBox(members));
    if (!onScreen(box)) continue;
    for (const part of parts) part.object.visible = part.layer === layerId;
    renderer.render(scene, camera);
    const src = `${view.id}/${layerId}.webp`;
    say(`渲染 ${view.label} · ${layerId}`);
    await post(`/save?path=${encodeURIComponent(src)}`, await blobOf(renderer.domElement));
    entry.layers[layerId] = { label: layers.find((layer) => layer.id === layerId).label, ...round(box) };
  }

  for (const anchor of anchors) {
    const members = parts.filter((part) => anchor.test(part));
    if (!members.length) { console.warn(`锚点 ${anchor.id} 没有匹配到结构`); continue; }
    const box = project(camera, unionBox(members));
    const [x, y] = round(box).at;
    if (x < 0 || y < 0 || x > W || y > H) continue;
    entry.anchors[anchor.id] = { label: anchor.label, ...round(box) };
  }
  atlas.views[view.id] = entry;
}

await post("/atlas", JSON.stringify(atlas, null, 1));
window.atlasDone = { counts, unused, views: Object.keys(atlas.views), missing: anchors.filter((a) => !parts.some((p) => a.test(p))).map((a) => a.id) };
say(`完成：${JSON.stringify(window.atlasDone)}`);
