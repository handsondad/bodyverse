import { bodyMysteryByPart as mysteryRaw } from "../data/mystery";
import { partContent as partsRaw } from "../data/part";
import { type MysteryPack, type PartId, type PartOverview } from "../types/content";

const parts = partsRaw as Record<PartId, PartOverview>;
const mystery = mysteryRaw as Record<PartId, MysteryPack>;

export { parts, mystery };
