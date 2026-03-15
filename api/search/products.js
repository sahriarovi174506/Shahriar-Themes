import { TEMPLATES } from "../templates-data.js";
import { applyPagination, buildSearchResults, sortScored } from "../search-utils.js";

const PRODUCT_FIELDS = [
    { key: "name", weight: 3.6 },
    { key: "desc", weight: 2.4 },
    { key: "category", weight: 1.5 },
    { key: "tech", weight: 1.2 },
    { key: "features", weight: 1.1 },
];

function parseList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => String(v));
    return String(value)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
}

function applyProductFilters(items, { category, tech, feature, minDownloads }) {
    let filtered = items;

    if (category && category !== "All") {
        filtered = filtered.filter((item) => String(item.category).toLowerCase() === String(category).toLowerCase());
    }

    if (tech && tech.length) {
        const techSet = new Set(tech.map((t) => t.toLowerCase()));
        filtered = filtered.filter((item) => (item.tech || []).some((t) => techSet.has(String(t).toLowerCase())));
    }

    if (feature && feature.length) {
        const featureSet = new Set(feature.map((f) => f.toLowerCase()));
        filtered = filtered.filter((item) => (item.features || []).some((f) => featureSet.has(String(f).toLowerCase())));
    }

    const min = Number(minDownloads);
    if (Number.isFinite(min) && min > 0) {
        filtered = filtered.filter((item) => Number(item.downloads || 0) >= min);
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
        category,
        tech,
        feature,
        minDownloads,
        page = 1,
        pageSize = 12,
        sort = "relevance",
        debug,
    } = req.query || {};

    const filters = {
        category,
        tech: parseList(tech),
        feature: parseList(feature),
        minDownloads,
    };

    const base = applyProductFilters(TEMPLATES, filters);
    const { scored } = buildSearchResults(base, q, {
        fields: PRODUCT_FIELDS,
        exactField: "name",
    });

    const shouldSortByDownloads = !q && (!sort || sort === "relevance");
    const sorted = sortScored(scored, shouldSortByDownloads ? "downloads" : sort, "relevance");

    const mapped = sorted.map((entry) => ({
        ...entry.item,
        score: debug ? entry.score : undefined,
    }));

    const paged = applyPagination(mapped, page, pageSize);

    return res.status(200).json({
        query: q,
        filters,
        sort: shouldSortByDownloads ? "downloads" : sort,
        ...paged,
    });
}
