import Redis from "ioredis";
import { TEMPLATES } from "./templates-data.js";

// Lazy-initialized Redis client
let redis = null;
const getRedisClient = () => {
    if (redis) return redis;
    if (!process.env.REDIS_URL) return null;
    try {
        redis = new Redis(process.env.REDIS_URL);
        return redis;
    } catch (err) {
        console.error("Redis Init Error:", err);
        return null;
    }
};

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const client = getRedisClient();

        if (!client) {
            throw new Error("Missing REDIS_URL or Connection Error");
        }

        const keys = TEMPLATES.map(t => `downloads:${t.id}`);
        // ioredis mget returns array of strings or null
        const counts = await client.mget(...keys);

        let totalDownloads = 0;
        TEMPLATES.forEach((t, i) => {
            totalDownloads += (counts && counts[i] !== null) ? Number(counts[i]) : 0;
        });

        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 150,
            avgRating: 5,
        });
    } catch (error) {
        console.error("Redis Stats error:", error);
        const totalDownloads = 0;
        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 150,
            avgRating: 5,
            isFallback: true,
            warning: "Database connection error"
        });
    }
}

