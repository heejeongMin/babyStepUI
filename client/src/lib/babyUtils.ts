import type { Baby } from "@shared/schema";

export function calculateCurrentMonth(birthdate: Date | string): number {
  const birth = new Date(birthdate);
  const now = new Date();
  const months = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  return Math.max(0, Math.min(months, 24));
}

export function getAgeLabel(baby: Baby): string {
  const months = calculateCurrentMonth(baby.birthdate);
  if (months === 0) return "Newborn";
  if (months === 1) return "1 month";
  return `${months} months`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
