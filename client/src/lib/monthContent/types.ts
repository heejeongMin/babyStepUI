import type { ChecklistItem } from "@shared/schema";

export type Lang = "ko" | "en";
export type L = { ko: string; en: string };
export type Category = ChecklistItem["category"];

export type RawItem = {
  id: string;
  category: Category;
  title: L;
  description: L;
};

export type RawMonth = {
  month: number;
  ageLabel: L;
  title: L;
  description: L;
  checklists: RawItem[];
  milestones: L[];
  tips: L[];
};

export const l = (ko: string, en: string): L => ({ ko, en });

export const it = (
  id: string,
  category: Category,
  title: L,
  description: L,
): RawItem => ({ id, category, title, description });

export const monthLabel = (month: number): L =>
  month === 0
    ? l("신생아", "Newborn")
    : l(`${month}개월`, month === 1 ? "1 Month" : `${month} Months`);
