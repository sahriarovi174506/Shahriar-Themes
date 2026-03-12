import { TEMPLATES } from "../templates-data.js";

export default function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    const { id } = req.query;
    const template = TEMPLATES.find((t) => t.id === parseInt(id, 10));

    if (!template) return res.status(404).json({ error: "Template not found" });
    return res.status(200).json(template);
}
