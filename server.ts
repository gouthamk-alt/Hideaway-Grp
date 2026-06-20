import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { defaultCMSContent } from "./src/defaultData.ts";

dotenv.config();

// Ensure the data directory exists
const DATA_DIR = path.join(process.cwd(), "src", "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DATA_FILE = path.join(DATA_DIR, "cms-data.json");

// Helper to load content
function getCMSContent() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading CMS data, falling back to default.", error);
  }
  
  // Write default contents if none exists or errored
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultCMSContent, null, 2), "utf-8");
  } catch (writeErr) {
    console.error("Could not write default CMS data", writeErr);
  }
  return defaultCMSContent;
}

// Helper to save content
function saveCMSContent(content: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
  return content;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API endpoints FIRST
  app.get("/api/content", (req, res) => {
    try {
      const content = getCMSContent();
      res.json(content);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/content", (req, res) => {
    try {
      const updated = saveCMSContent(req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/generate-copy", async (req, res) => {
    const { title, location, amenities, tone } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: "GEMINI_API_KEY is not defined. Please add your key in the Settings > Secrets panel." 
      });
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      
      const prompt = `You are a professional architectural writer and travel copywriter for "Hideaway Group", an ultra-premium collection of boutique secluded retreats.
Write a rich, poetic, and alluring description of around 3-4 sentences for a new boutique getaway property. Avoid clichéd, generic, and obvious "hype-man" advertising terms like "Stunning paradise!", "Perfect getaway!", "Look no further!", or "Unforgettable experience!". Focus instead on atmosphere, materials, natural lighting, sensory details, and organic connection to the landscape.

Property Name: "${title}"
Location: "${location}"
Refined Amenities: ${Array.isArray(amenities) ? amenities.join(", ") : amenities || "None listed"}
Desired Atmospheric Tone: ${tone || "Sultry, Raw, Woodsy & Tactile"}

Write only the description paragraph that directly matches this tone. Return no other helper text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.82
        }
      });

      const copyText = response.text?.trim() || "No copywriting generated.";
      res.json({ text: copyText });
    } catch (err: any) {
      console.error("Gemini copywriter error:", err);
      res.status(500).json({ error: `Gemini API fail: ${err.message}` });
    }
  });

  // Serve static UI or let Vite mount as middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

startServer();
