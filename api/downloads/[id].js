import { kv } from "@vercel/kv";
import { TEMPLATES } from "../../src/data/templates.js";

export default async function handler(req, res) {
    const { id } = req.query;
    console.log(`Download request for ID: ${id}, Method: ${req.method}`);

    // Ensure ID is a number
    const templateId = Number(id);
    const template = TEMPLATES.find((t) => t.id === templateId);

    if (!template) {
        console.error(`Template not found for ID: ${id}`);
        return res.status(404).json({ error: "Template not found" });
    }

    const key = `downloads:${templateId}`;

    // Add basic CORS if needed (though usually same-origin on Vercel)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        if (req.method === "POST") {
            let newCount = await kv.incr(key);
            if (newCount === 1 && template.downloads > 0) {
                newCount = template.downloads + 1;
                await kv.set(key, newCount);
            }
            console.log(`Incremented downloads for ${template.name} (ID: ${templateId}). New count: ${newCount}`);
            return res.status(200).json({ success: true, id: templateId, count: newCount });
        }

        if (req.method === "GET") {
            const stored = await kv.get(key);
            const count = stored !== null ? Number(stored) : template.downloads;
            return res.status(200).json({ id: templateId, count });
        }
    } catch (error) {
        console.error(`KV Error for ID ${id}:`, error);
        // Fallback to static count from template metadata instead of 500 error
        return res.status(200).json({
            id: templateId,
            count: template.downloads,
            warning: "KV database connection error, using static fallback"
        });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
