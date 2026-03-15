export function normalizeText(value) {
    if (!value) return "";
    return String(value)
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export function tokenize(query) {
    const normalized = normalizeText(query);
    return normalized ? normalized.split(/\s+/g).filter(Boolean) : [];
}

function levenshtein(a, b) {
    if (a === b) return 0;
    const al = a.length;
    const bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;

    const matrix = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
    for (let i = 0; i <= al; i += 1) matrix[i][0] = i;
    for (let j = 0; j <= bl; j += 1) matrix[0][j] = j;

    for (let i = 1; i <= al; i += 1) {
        for (let j = 1; j <= bl; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[al][bl];
}

function fuzzyTokenMatch(token, text) {
    if (!token || !text) return false;
    const words = text.split(/\s+/g);
    const maxDistance = token.length <= 5 ? 1 : 2;
    return words.some((word) => {
        if (Math.abs(word.length - token.length) > maxDistance) return false;
        return levenshtein(token, word) <= maxDistance;
    });
}

export function scoreText(text, tokens, phrase) {
    if (!text) return 0;
    const normalized = normalizeText(text);
    if (!normalized) return 0;

    let score = 0;
    if (phrase && normalized.includes(phrase)) score += 40;

    tokens.forEach((token) => {
        if (normalized.includes(token)) score += 10;
        if (normalized.startsWith(token)) score += 12;
        if (token.length >= 4 && fuzzyTokenMatch(token, normalized)) score += 6;
    });

    return score;
}

export function buildSearchResults(items, query, config) {
    const tokens = tokenize(query);
    const phrase = normalizeText(query);

    const results = items.map((item) => {
        let score = 0;
        for (const field of config.fields) {
            const value = item[field.key];
            if (Array.isArray(value)) {
                const joined = value.join(" ");
                score += scoreText(joined, tokens, phrase) * field.weight;
            } else {
                score += scoreText(value, tokens, phrase) * field.weight;
            }
        }

        if (config.exactField && phrase) {
            const exactValue = normalizeText(item[config.exactField]);
            if (exactValue === phrase) score += 80;
        }

        return { item, score };
    });

    return { tokens, phrase, scored: results };
}

export function applyPagination(list, page, pageSize) {
    const size = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
    const current = Math.max(Number(page) || 1, 1);
    const total = list.length;
    const totalPages = Math.max(Math.ceil(total / size), 1);
    const start = (current - 1) * size;
    const end = start + size;
    return {
        page: current,
        pageSize: size,
        total,
        totalPages,
        results: list.slice(start, end),
    };
}

export function sortScored(scored, sort, fallback = "relevance") {
    const mode = sort || fallback;
    const sorted = [...scored];

    if (mode === "name") {
        sorted.sort((a, b) => String(a.item.name || a.item.title).localeCompare(String(b.item.name || b.item.title)));
        return sorted;
    }

    if (mode === "downloads") {
        sorted.sort((a, b) => (b.item.downloads || 0) - (a.item.downloads || 0));
        return sorted;
    }

    sorted.sort((a, b) => b.score - a.score);
    return sorted;
}
