import type { Baby } from "@shared/schema";
import { i18n } from "i18next";

export function calculateCurrentMonth(birthdate: Date | string): number {
  const birth = new Date(birthdate);
  const now = new Date();
  const months = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  return Math.max(0, Math.min(months, 24));
}

export function getAgeLabel(baby: Baby, t: i18n): string {
  const months = calculateCurrentMonth(baby.birthdate);
  if (months === 0) return t("newBorn");
  if (months === 1) return t("ageLabelOneMonth", { month: months });
  return t("ageLabel", { month: `${months}` });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
