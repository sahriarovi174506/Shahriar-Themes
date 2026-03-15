import { SITE_INDEX } from "../site-search-data.js";
import { applyPagination, buildSearchResults, sortScored } from "../search-utils.js";

const SITE_FIELDS = [
    { key: "title", weight: 3.2 },
    { key: "excerpt", weight: 2.4 },
    { key: "tags", weight: 1.4 },
];

function parseList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => String(v));
    return String(value)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
}

function applySiteFilters(items, { type, pageKey }) {
    let filtered = items;

    if (type && type.length) {
        const typeSet = new Set(type.map((t) => t.toLowerCase()));
        filtered = filtered.filter((item) => typeSet.has(String(item.type).toLowerCase()));
    }

    if (pageKey) {
        filtered = filtered.filter((item) => String(item.page).toLowerCase() === String(pageKey).toLowerCase());
    }

    return filtered;
}

export default function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    const {
        q = "",
        type,
        pageKey,
        sort = "relevance",
        pageSize = 10,
        page: pageNumber = 1,
        debug,
    } = req.query || {};

    const filters = {
        type: parseList(type),
        pageKey,
    };

    const base = applySiteFilters(SITE_INDEX, filters);
    const { scored } = buildSearchResults(base, q, {
        fields: SITE_FIELDS,
        exactField: "title",
    });

    const sorted = sortScored(scored, sort, "relevance");
    const mapped = sorted.map((entry) => ({
        ...entry.item,
        score: debug ? entry.score : undefined,
    }));

    const paged = applyPagination(mapped, pageNumber, pageSize);

    return res.status(200).json({
        query: q,
        filters,
        sort,
        ...paged,
    });
}
