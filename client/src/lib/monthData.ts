import type { MonthInfo } from "@shared/schema";
import type { Lang, RawMonth } from "./monthContent/types";
import { months0to6 } from "./monthContent/months0to6";
import { months7to12 } from "./monthContent/months7to12";
import { months13to24 } from "./monthContent/months13to24";

const rawMonths: RawMonth[] = [...months0to6, ...months7to12, ...months13to24];

export function toLang(language: string | undefined): Lang {
  return language?.startsWith("en") ? "en" : "ko";
}

function localize(raw: RawMonth, lang: Lang): MonthInfo {
  return {
    month: raw.month,
    ageLabel: raw.ageLabel[lang],
    title: raw.title[lang],
    description: raw.description[lang],
    checklists: raw.checklists.map((item) => ({
      id: item.id,
      title: item.title[lang],
      description: item.description[lang],
      completed: false,
      category: item.category,
    })),
    milestones: raw.milestones.map((m) => m[lang]),
    tips: raw.tips.map((t) => t[lang]),
  };
}

export function getMonthsData(language?: string): MonthInfo[] {
  const lang = toLang(language);
  return rawMonths.map((m) => localize(m, lang));
}

export function getMonthData(month: number, language?: string): MonthInfo | undefined {
  const raw = rawMonths.find((m) => m.month === month);
  return raw ? localize(raw, toLang(language)) : undefined;
}

export function getAllMonths(): number[] {
  return rawMonths.map((m) => m.month);
}
