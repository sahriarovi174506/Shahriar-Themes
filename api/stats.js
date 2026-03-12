import { kv } from "@vercel/kv";
import { TEMPLATES } from "../src/data/templates.js";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const keys = TEMPLATES.map(t => `downloads:${t.id}`);
        const counts = await kv.mget(...keys);

        let totalDownloads = 0;
        TEMPLATES.forEach((t, i) => {
            totalDownloads += counts[i] !== null ? Number(counts[i]) : t.downloads;
        });

        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120, // Static or can be dynamic
            avgRating: 5,
        });
    } catch (error) {
        console.error("Stats error:", error);
        const totalDownloads = TEMPLATES.reduce((sum, t) => sum + t.downloads, 0);
        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120,
            avgRating: 5,
        });
    }
}
