import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBabySchema, insertChecklistProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/babies", async (req, res) => {
    const babies = await storage.getAllBabies();
    res.json(babies);
  });

  app.post("/api/babies", async (req, res) => {
    try {
      const validatedData = insertBabySchema.parse(req.body);
      const baby = await storage.createBaby(validatedData);
      res.status(201).json(baby);
    } catch (error) {
      res.status(400).json({ error: "Invalid baby data" });
    }
  });

  app.get("/api/babies/:id", async (req, res) => {
    const baby = await storage.getBaby(req.params.id);
    if (!baby) {
      return res.status(404).json({ error: "Baby not found" });
    }
    res.json(baby);
  });

  app.patch("/api/babies/:id", async (req, res) => {
    try {
      const baby = await storage.updateBaby(req.params.id, req.body);
      if (!baby) {
        return res.status(404).json({ error: "Baby not found" });
      }
      res.json(baby);
    } catch (error) {
      res.status(400).json({ error: "Invalid baby data" });
    }
  });

  app.delete("/api/babies/:id", async (req, res) => {
    const deleted = await storage.deleteBaby(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Baby not found" });
    }
    res.status(204).send();
  });

  app.get("/api/babies/:id/progress", async (req, res) => {
    const progress = await storage.getChecklistProgress(req.params.id);
    res.json(progress);
  });

  app.post("/api/babies/:id/progress", async (req, res) => {
    try {
      const validatedData = insertChecklistProgressSchema.parse({
        ...req.body,
        babyId: req.params.id,
      });
      const progress = await storage.updateChecklistProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
