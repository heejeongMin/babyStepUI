import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
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
