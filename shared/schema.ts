import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const babies = pgTable("babies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  birthdate: timestamp("birthdate").notNull(),
  currentMonth: integer("current_month").notNull().default(0),
});

export const insertBabySchema = createInsertSchema(babies).omit({
  id: true,
}).extend({
  birthdate: z.coerce.date(),
});

export type InsertBaby = z.infer<typeof insertBabySchema>;
export type Baby = typeof babies.$inferSelect;

export const checklistProgress = pgTable("checklist_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  babyId: varchar("baby_id").notNull(),
  checklistItemId: text("checklist_item_id").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertChecklistProgressSchema = createInsertSchema(checklistProgress).omit({
  id: true,
});

export type InsertChecklistProgress = z.infer<typeof insertChecklistProgressSchema>;
export type ChecklistProgress = typeof checklistProgress.$inferSelect;

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'supplements' | 'play' | 'movement' | 'sleep' | 'feeding' | 'safety';
};

export type MonthInfo = {
  month: number;
  ageLabel: string;
  title: string;
  description: string;
  checklists: ChecklistItem[];
  milestones: string[];
  tips: string[];
};
