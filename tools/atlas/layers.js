// 图层、视角、锚点的定义。part = { name, systems:Set, center:{x,y,z} }，模型 Z 轴朝上。

const is = (re) => (part) => re.test(part.name);
const inSystem = (system, re) => (part) => part.systems.has(system) && (!re || re.test(part.name));
const not = (test) => (part) => !test(part);
const all = (...tests) => (part) => tests.every((test) => test(part));

const lungs = is(/^(左|右)肺(上|中|下)叶$/);
const heart = is(/^(左|右)心(房|室)$|乳头肌|^心(大|中|小)静脉$|^左心室后静脉$|^升主动脉$|^主动脉弓$|^肺动脉干$|^上腔静脉$/);
const brain = all(inSystem("nervous"), (part) => part.center.z > 0.98, not(is(/神经|脊髓/)));

/** 给孩子看的图集不画生殖器官，相关的血管、神经、尿道也一并去掉 */
export const excluded = is(/阴茎|阴囊|阴部|睾丸|附睾|精|前列腺|尿道|会阴/);

/** 按顺序匹配，一个结构只进第一个匹配到的图层 */
export const layers = [
  { id: "skin", label: "皮肤", color: "#ffd6bf", test: inSystem("skin") },
  { id: "teeth", label: "牙齿", color: "#fffaf0", test: is(/切牙|尖牙|磨牙/) },
  { id: "skeleton", label: "骨头", color: "#f4ecd8", test: inSystem("skeletal", /^(?!.*(韧带|膜|囊|脂肪垫|轮匝带|索|髋臼唇|半月板|关节盘)).*$/) },
  { id: "diaphragm", label: "膈肌", color: "#e07b6a", test: is(/^膈$/) },
  { id: "muscles", label: "肌肉", color: "#e98a7c", test: inSystem("muscular", /^(?!.*(筋膜|腱鞘|囊|间隔|膜)).*$/) },
  { id: "brain", label: "大脑", color: "#f6a7c1", test: brain },
  { id: "nerves", label: "神经", color: "#ffcf3f", test: inSystem("nervous") },
  { id: "heart", label: "心脏", color: "#e0485e", test: heart },
  { id: "arteries", label: "动脉", color: "#ec5a5f", test: inSystem("cardiovascular", /动脉/) },
  { id: "veins", label: "静脉", color: "#5a86dc", test: inSystem("cardiovascular") },
  { id: "lungs", label: "肺", color: "#f7a8b5", test: lungs },
  { id: "airway", label: "气管和鼻腔", color: "#7cc8ea", test: inSystem("respiratory", /^(?!.*(胸膜|筛骨|窦)).*$/) },
  { id: "esophagus", label: "食管", color: "#f0a27c", test: is(/^食管$/) },
  { id: "stomach", label: "胃", color: "#f5b14f", test: is(/^胃(黏膜)?$/) },
  { id: "smallIntestine", label: "小肠", color: "#f8c86b", test: is(/^(十二指肠|空肠|回肠)$/) },
  { id: "largeIntestine", label: "大肠", color: "#cf9c6b", test: is(/^(升结肠|横结肠|降结肠|乙状结肠|阑尾|盲肠|直肠)$/) },
  { id: "liver", label: "肝和胆囊", color: "#b45c47", test: inSystem("digestive", /^肝|胆囊|胆总管/) },
  { id: "pancreas", label: "胰", color: "#f3d37c", test: inSystem("digestive", /^胰$/) },
  { id: "mouth", label: "舌头和唾液腺", color: "#f27f8c", test: inSystem("digestive", /^舌$|腮腺|下颌下腺|舌下腺/) },
  { id: "kidneys", label: "肾和膀胱", color: "#b9573f", test: inSystem("urinary") },
  { id: "eyes", label: "眼睛", color: "#9fd3ff", test: inSystem("sensory", /眼|角膜|虹膜|晶状体|视网膜|巩膜|玻璃体|睫状|泪/) },
  { id: "ears", label: "耳朵", color: "#c7a7ff", test: inSystem("sensory", /耳蜗|前庭|锤骨|砧骨|镫骨|鼓膜|咽鼓管/) },
  { id: "immune", label: "淋巴和脾", color: "#7ed392", test: inSystem("lymphatic") }
];

const headBones = is(/^(额骨|下颌骨|枕骨|(左|右)侧顶骨|(左|右)侧颧骨)$/);

/**
 * 视角：dir 为 front（从正面看）或 side（从左侧看）。
 * fit 选出要框住的结构，pad 为留白倍数。layers 为这个视角渲染哪些图层。
 */
export const views = [
  { id: "body", label: "全身", dir: "front", fit: inSystem("skin"), pad: 1.04, layers: "all" },
  {
    id: "head", label: "头部正面", dir: "front", fit: headBones, pad: 1.28,
    layers: ["skin", "skeleton", "muscles", "brain", "nerves", "arteries", "veins", "airway", "mouth", "teeth", "eyes", "ears", "immune"]
  },
  {
    id: "headSide", label: "头部和喉咙侧面", dir: "side", fit: (part) => headBones(part) || is(/^(甲状软骨|环状软骨|舌骨)$/)(part), pad: 1.12,
    layers: ["skin", "skeleton", "muscles", "brain", "nerves", "arteries", "veins", "airway", "esophagus", "mouth", "teeth", "eyes", "ears", "immune"]
  },
  {
    id: "chest", label: "胸腔", dir: "front", fit: (part) => lungs(part) || is(/^膈$/)(part), pad: 1.12,
    layers: ["skin", "skeleton", "diaphragm", "muscles", "nerves", "heart", "arteries", "veins", "lungs", "airway", "esophagus", "stomach", "liver", "immune"]
  },
  {
    id: "belly", label: "肚子", dir: "front", fit: is(/^(胃|肝|空肠|升结肠|降结肠|乙状结肠|膀胱|左侧肾|右侧肾)$/), pad: 1.08,
    layers: ["skin", "skeleton", "diaphragm", "muscles", "arteries", "veins", "lungs", "heart", "esophagus", "stomach", "smallIntestine", "largeIntestine", "liver", "pancreas", "kidneys", "immune"]
  },
  {
    id: "hand", label: "手", dir: "front", fit: is(/^右侧(第.指.节指骨|第.掌骨|头状骨|钩骨|月骨|三角骨|豌豆骨|手舟骨|大多角骨|小多角骨)$/), pad: 1.25,
    layers: ["skin", "skeleton", "muscles", "nerves", "arteries", "veins"]
  },
  {
    id: "arm", label: "胳膊", dir: "front", fit: is(/^右侧(肱骨|桡骨|尺骨|锁骨|肩胛骨)$/), pad: 1.06,
    layers: ["skin", "skeleton", "muscles", "nerves", "arteries", "veins"]
  },
  {
    id: "leg", label: "腿", dir: "front", fit: is(/^右侧(股骨|胫骨|腓骨|髌骨|跟骨)$/), pad: 1.04,
    layers: ["skin", "skeleton", "muscles", "nerves", "arteries", "veins"]
  }
];

/** 锚点：动画里贴标签、画箭头用的位置，取匹配结构合起来的包围盒 */
export const anchors = [
  { id: "nose", label: "鼻腔", test: is(/^鼻腔黏膜$/) },
  { id: "nasopharynx", label: "鼻子后面", test: is(/^鼻咽$/) },
  { id: "throat", label: "喉咙", test: is(/^(口咽|喉咽)$/) },
  { id: "larynx", label: "喉咙口", test: is(/^(甲状软骨|环状软骨|会厌)$/) },
  { id: "epiglottis", label: "会厌", test: is(/^会厌$/) },
  { id: "softPalate", label: "软腭", test: is(/^(软腭|腭垂)$/) },
  { id: "trachea", label: "气管", test: is(/^气管$/) },
  { id: "bronchi", label: "支气管", test: is(/主支气管$/) },
  { id: "lungLeft", label: "左肺", test: is(/^左肺(上|下)叶$/) },
  { id: "lungRight", label: "右肺", test: is(/^右肺(上|中|下)叶$/) },
  { id: "lungs", label: "肺", test: lungs },
  { id: "diaphragm", label: "膈肌", test: is(/^膈$/) },
  { id: "heart", label: "心脏", test: heart },
  { id: "ventricleLeft", label: "左心室", test: is(/^左心室$/) },
  { id: "ventricleRight", label: "右心室", test: is(/^右心室$/) },
  { id: "atriumLeft", label: "左心房", test: is(/^左心房$/) },
  { id: "atriumRight", label: "右心房", test: is(/^右心房$/) },
  { id: "aorta", label: "主动脉", test: is(/^(升主动脉|主动脉弓)$/) },
  { id: "pulmonaryTrunk", label: "肺动脉", test: is(/^肺动脉干$/) },
  { id: "venaCava", label: "腔静脉", test: is(/^(上腔静脉|下腔静脉胸部)$/) },
  { id: "carotid", label: "颈动脉", test: is(/^右颈总动脉$/) },
  { id: "radialArtery", label: "手腕的动脉", test: is(/^右侧桡动脉$/) },
  { id: "femoralArtery", label: "大腿的动脉", test: is(/^右侧股动脉$/) },
  { id: "brain", label: "大脑", test: brain },
  { id: "cerebellum", label: "小脑", test: all(brain, is(/小脑/)) },
  { id: "brainstem", label: "脑干", test: is(/^(左|右)侧(延髓|脑桥|中脑)$/) },
  { id: "hypothalamus", label: "下丘脑", test: is(/^下丘脑$/) },
  { id: "thalamus", label: "丘脑", test: is(/^(左|右)侧丘脑$/) },
  { id: "spinalCord", label: "脊髓", test: inSystem("nervous", /^脊髓/) },
  { id: "vagus", label: "迷走神经", test: is(/^右侧迷走神经$/) },
  { id: "sciatic", label: "坐骨神经", test: is(/^右侧坐骨神经$/) },
  { id: "medianNerve", label: "手臂的神经", test: is(/^右侧正中神经$/) },
  { id: "eye", label: "眼睛", test: is(/^左侧(巩膜|角膜)$/) },
  { id: "eyeRight", label: "眼睛", test: is(/^右侧(巩膜|角膜)$/) },
  { id: "lens", label: "晶状体", test: is(/^左侧晶状体$/) },
  { id: "retina", label: "视网膜", test: is(/^左侧视网膜$/) },
  { id: "tearGland", label: "泪腺", test: is(/^左侧泪腺$/) },
  { id: "tearDuct", label: "鼻泪管", test: is(/^左侧鼻泪管$/) },
  { id: "ear", label: "耳朵里面", test: is(/^左侧(耳蜗|前庭|鼓膜)$/) },
  { id: "earRight", label: "耳朵里面", test: is(/^右侧(耳蜗|前庭|鼓膜)$/) },
  { id: "cochlea", label: "耳蜗", test: is(/^左侧耳蜗$/) },
  { id: "vestibule", label: "前庭", test: is(/^左侧前庭$/) },
  { id: "eardrum", label: "鼓膜", test: is(/^左侧鼓膜$/) },
  { id: "tongue", label: "舌头", test: is(/^舌$/) },
  { id: "teeth", label: "牙齿", test: is(/切牙|尖牙|磨牙/) },
  { id: "parotid", label: "唾液腺", test: is(/^左侧腮腺$/) },
  { id: "esophagus", label: "食管", test: is(/^食管$/) },
  { id: "stomach", label: "胃", test: is(/^胃$/) },
  { id: "smallIntestine", label: "小肠", test: is(/^(十二指肠|空肠|回肠)$/) },
  { id: "largeIntestine", label: "大肠", test: is(/^(升结肠|横结肠|降结肠|乙状结肠)$/) },
  { id: "colonEnd", label: "大肠末端", test: is(/^乙状结肠$/) },
  { id: "liver", label: "肝", test: inSystem("digestive", /^肝$/) },
  { id: "gallbladder", label: "胆囊", test: is(/^胆囊$/) },
  { id: "pancreas", label: "胰", test: inSystem("digestive", /^胰$/) },
  { id: "kidneyLeft", label: "左肾", test: is(/^左侧肾$/) },
  { id: "kidneyRight", label: "右肾", test: is(/^右侧肾$/) },
  { id: "bladder", label: "膀胱", test: is(/^膀胱$/) },
  { id: "spleen", label: "脾", test: is(/^脾$/) },
  { id: "thymus", label: "胸腺", test: is(/^胸腺(左|右)叶$/) },
  { id: "tonsils", label: "扁桃体", test: is(/腭扁桃体$/) },
  { id: "lymphNeck", label: "脖子的淋巴结", test: inSystem("lymphatic", /^右侧颈/) },
  { id: "skull", label: "头骨", test: headBones },
  { id: "ribs", label: "肋骨", test: is(/^(左|右)侧第.+肋$/) },
  { id: "spine", label: "脊柱", test: is(/[颈胸腰]椎$/) },
  { id: "humerus", label: "上臂骨", test: is(/^右侧肱骨$/) },
  { id: "forearm", label: "前臂骨", test: is(/^右侧(桡骨|尺骨)$/) },
  { id: "fingerBones", label: "指骨", test: is(/^右侧第二指.节指骨$/) },
  { id: "fingerTip", label: "指尖", test: is(/^右侧第二指远节指骨$/) },
  { id: "fingerMiddle", label: "中节指骨", test: is(/^右侧第二指中节指骨$/) },
  { id: "fingerBase", label: "近节指骨", test: is(/^右侧第二指近节指骨$/) },
  { id: "palm", label: "手掌骨", test: is(/^右侧第.掌骨$/) },
  { id: "wrist", label: "手腕", test: is(/^右侧(头状骨|钩骨|月骨|三角骨|豌豆骨|手舟骨|大多角骨|小多角骨)$/) },
  { id: "fingerFlexors", label: "拉手指的肌肉", test: is(/^右侧(指浅屈肌|指深屈肌)$/) },
  { id: "fingerExtensors", label: "伸手指的肌肉", test: is(/^右侧(指伸肌|示指伸肌)$/) },
  { id: "biceps", label: "肱二头肌", test: is(/^右侧肱二头肌(长|短)头$/) },
  { id: "triceps", label: "肱三头肌", test: is(/^右侧肱三头肌/) },
  { id: "femur", label: "大腿骨", test: is(/^右侧股骨$/) },
  { id: "tibia", label: "小腿骨", test: is(/^右侧胫骨$/) },
  { id: "knee", label: "膝盖", test: is(/^右侧髌骨$/) },
  { id: "quads", label: "大腿前面的肌肉", test: is(/^右侧(股直肌|股外侧肌|股内侧肌)$/) },
  { id: "calf", label: "小腿肚", test: is(/^右侧腓肠肌(内|外)侧头$/) },
  { id: "foot", label: "脚", test: is(/^右侧(跟骨|距骨|足舟骨|骰骨|第.跖骨)$/) },
  { id: "pelvis", label: "骨盆", test: is(/^(左|右)侧髋骨$|^骶骨$/) },
  { id: "face", label: "脸颊", test: is(/^(左|右)侧颧骨$/) },
  { id: "chestSkin", label: "胸口", test: is(/^胸骨体$/) },
  { id: "belly", label: "肚子", test: is(/^(空肠|横结肠)$/) },
  { id: "navel", label: "肚脐", test: is(/^第三腰椎$/) }
];
