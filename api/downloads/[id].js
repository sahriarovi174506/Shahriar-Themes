import { kv } from "@vercel/kv";
import { TEMPLATES } from "../../src/data/templates.js";

export default async function handler(req, res) {
    const { id } = req.query;
    const numId = parseInt(id, 10);
    const template = TEMPLATES.find((t) => t.id === numId);

    if (!template) return res.status(404).json({ error: "Template not found" });

    const kvKey = `downloads:${id}`;

    if (req.method === "GET") {
        const stored = await kv.get(kvKey);
        const count = stored !== null ? Number(stored) : template.downloads;
        return res.status(200).json({ id: numId, count });
    }

    if (req.method === "POST") {
        const exists = await kv.exists(kvKey);
        if (!exists) await kv.set(kvKey, template.downloads);
        const newCount = await kv.incr(kvKey);
        return res.status(200).json({ id: numId, count: newCount });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
