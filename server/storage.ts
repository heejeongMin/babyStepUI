import { 
  type User, 
  type InsertUser,
  type Baby,
  type InsertBaby,
  type ChecklistProgress,
  type InsertChecklistProgress
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllBabies(): Promise<Baby[]>;
  getBaby(id: string): Promise<Baby | undefined>;
  createBaby(baby: InsertBaby): Promise<Baby>;
  updateBaby(id: string, baby: Partial<InsertBaby>): Promise<Baby | undefined>;
  deleteBaby(id: string): Promise<boolean>;
  
  getChecklistProgress(babyId: string): Promise<ChecklistProgress[]>;
  updateChecklistProgress(progress: InsertChecklistProgress): Promise<ChecklistProgress>;
  deleteChecklistProgressByBaby(babyId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private babies: Map<string, Baby>;
  private checklistProgress: Map<string, ChecklistProgress>;

  constructor() {
    this.users = new Map();
    this.babies = new Map();
    this.checklistProgress = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBabies(): Promise<Baby[]> {
    return Array.from(this.babies.values());
  }

  async getBaby(id: string): Promise<Baby | undefined> {
    return this.babies.get(id);
  }

  async createBaby(insertBaby: InsertBaby): Promise<Baby> {
    const id = randomUUID();
    const baby: Baby = { 
      ...insertBaby, 
      id,
      currentMonth: insertBaby.currentMonth ?? 0
    };
    this.babies.set(id, baby);
    return baby;
  }

  async updateBaby(id: string, updates: Partial<InsertBaby>): Promise<Baby | undefined> {
    const baby = this.babies.get(id);
    if (!baby) return undefined;

    const updated: Baby = { ...baby, ...updates };
    this.babies.set(id, updated);
    return updated;
  }

  async deleteBaby(id: string): Promise<boolean> {
    await this.deleteChecklistProgressByBaby(id);
    return this.babies.delete(id);
  }

  async getChecklistProgress(babyId: string): Promise<ChecklistProgress[]> {
    return Array.from(this.checklistProgress.values()).filter(
      (progress) => progress.babyId === babyId
    );
  }

  async updateChecklistProgress(insertProgress: InsertChecklistProgress): Promise<ChecklistProgress> {
    const existing = Array.from(this.checklistProgress.values()).find(
      (p) => p.babyId === insertProgress.babyId && p.checklistItemId === insertProgress.checklistItemId
    );

    if (existing) {
      const updated: ChecklistProgress = { 
        ...existing, 
        completed: insertProgress.completed ?? false 
      };
      this.checklistProgress.set(existing.id, updated);
      return updated;
    }

    const id = randomUUID();
    const progress: ChecklistProgress = { 
      ...insertProgress, 
      id,
      completed: insertProgress.completed ?? false
    };
    this.checklistProgress.set(id, progress);
    return progress;
  }

  async deleteChecklistProgressByBaby(babyId: string): Promise<void> {
    const toDelete = Array.from(this.checklistProgress.entries())
      .filter(([_, progress]) => progress.babyId === babyId)
      .map(([id, _]) => id);
    
    toDelete.forEach(id => this.checklistProgress.delete(id));
  }
}

export const storage = new MemStorage();
