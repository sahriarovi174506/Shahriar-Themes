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
    // Only allow GET for easy execution from browser
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const client = getRedisClient();

        if (!client) {
            return res.status(500).json({ error: "Missing REDIS_URL or Connection Error" });
        }

        const keys = TEMPLATES.map(t => `downloads:${t.id}`);
        const pipeline = client.pipeline();
        keys.forEach((key) => pipeline.set(key, 0));
        await pipeline.exec();

        return res.status(200).json({
            success: true,
            message: `Successfully reset ${keys.length} template counts to 0.`,
            resetKeys: keys
        });
    } catch (error) {
        console.error("Redis Reset error:", error);
        return res.status(500).json({ error: error.message });
    }
}
