import { kv } from "@vercel/kv";
import { TEMPLATES } from "../../src/data/templates.js";

export default async function handler(req, res) {
    const { id } = req.query;
    const template = TEMPLATES.find((t) => t.id === Number(id));
    if (!template) return res.status(404).json({ error: "Template not found" });

    const key = `downloads:${id}`;

    if (req.method === "POST") {
        // Increment count. If it doesn't exist, it starts from 1.
        // We handle seeding more simply: if result is 1, and we have initial data, we seed it.
        let newCount = await kv.incr(key);
        if (newCount === 1 && template.downloads > 0) {
            newCount = template.downloads + 1;
            await kv.set(key, newCount);
        }
        return res.status(200).json({ id: template.id, count: newCount });
    }

    if (req.method === "GET") {
        const stored = await kv.get(key);
        const count = stored !== null ? Number(stored) : template.downloads;
        return res.status(200).json({ id: template.id, count });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
