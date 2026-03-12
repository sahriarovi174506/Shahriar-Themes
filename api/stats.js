import Redis from "ioredis";
import { TEMPLATES } from "./templates-data.js";

const redis = new Redis(process.env.REDIS_URL || "");

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        if (!process.env.REDIS_URL) throw new Error("Missing REDIS_URL");

        const keys = TEMPLATES.map(t => `downloads:${t.id}`);
        // ioredis mget returns array of strings or null
        const counts = await redis.mget(...keys);

        let totalDownloads = 0;
        TEMPLATES.forEach((t, i) => {
            totalDownloads += (counts && counts[i] !== null) ? Number(counts[i]) : t.downloads;
        });

        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120,
            avgRating: 5,
        });
    } catch (error) {
        console.error("Redis Stats error:", error);
        const totalDownloads = TEMPLATES.reduce((sum, t) => sum + t.downloads, 0);
        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120,
            avgRating: 5,
            isFallback: true,
            warning: "Database connection error"
        });
    }
}
