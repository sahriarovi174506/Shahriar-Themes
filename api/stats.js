import { kv } from "@vercel/kv";
import { TEMPLATES } from "../src/data/templates.js";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const pipeline = kv.pipeline();
        TEMPLATES.forEach((t) => pipeline.get(`downloads:${t.id}`));
        const counts = await pipeline.exec();

        let totalDownloads = 0;
        TEMPLATES.forEach((t, i) => {
            const stored = counts[i];
            totalDownloads += stored !== null ? Number(stored) : t.downloads;
        });

        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120,
            avgRating: 5,
        });
    } catch {
        const totalDownloads = TEMPLATES.reduce((sum, t) => sum + t.downloads, 0);
        return res.status(200).json({
            totalTemplates: TEMPLATES.length,
            totalDownloads,
            happyClients: 120,
            avgRating: 5,
        });
    }
}
