import Redis from "ioredis";
import { TEMPLATES } from "../templates-data.js";

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
    const { id } = req.query;

    // Ensure ID is a number
    const templateId = Number(id);
    const template = TEMPLATES.find((t) => t.id === templateId);

    if (!template) {
        return res.status(404).json({ error: "Template not found" });
    }

    const key = `downloads:${templateId}`;

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const client = getRedisClient();

        if (!client) {
            console.warn("Redis client not available, using fallback.");
            return res.status(200).json({
                id: templateId,
                count: 0,
                isFallback: true,
                warning: "Database not connected"
            });
        }

        if (req.method === "POST") {
            let newCount = await client.incr(key);
            return res.status(200).json({ success: true, id: templateId, count: newCount });
        }

        if (req.method === "GET") {
            const stored = await client.get(key);
            const count = stored !== null ? Number(stored) : 0;
            return res.status(200).json({ id: templateId, count });
        }
    } catch (error) {
        console.error("API Logic Error:", error);
        return res.status(200).json({
            id: templateId,
            count: 0,
            isFallback: true,
            warning: "Server fallback"
        });
    }

    return res.status(405).json({ error: "Method not allowed" });
}

