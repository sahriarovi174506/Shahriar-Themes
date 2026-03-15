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

function scoreText(text, tokens, phrase) {
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

function scoreItem(item, query, fields, exactField) {
  const tokens = tokenize(query);
  const phrase = normalizeText(query);

  let score = 0;
  fields.forEach((field) => {
    const value = item[field.key];
    if (Array.isArray(value)) {
      score += scoreText(value.join(" "), tokens, phrase) * field.weight;
    } else {
      score += scoreText(value, tokens, phrase) * field.weight;
    }
  });

  if (exactField && phrase) {
    const exactValue = normalizeText(item[exactField]);
    if (exactValue === phrase) score += 80;
  }

  return score;
}

export function searchProductsLocal(templates, { query = "", filters = {}, sort = "relevance", page = 1, pageSize = 12 }) {
  const fields = [
    { key: "name", weight: 3.6 },
    { key: "desc", weight: 2.4 },
    { key: "category", weight: 1.5 },
    { key: "tech", weight: 1.2 },
    { key: "features", weight: 1.1 },
  ];

  let filtered = [...templates];
  if (filters.category && filters.category !== "All") {
    filtered = filtered.filter((item) => String(item.category).toLowerCase() === String(filters.category).toLowerCase());
  }
  if (filters.tech?.length) {
    const techSet = new Set(filters.tech.map((t) => t.toLowerCase()));
    filtered = filtered.filter((item) => (item.tech || []).some((t) => techSet.has(String(t).toLowerCase())));
  }
  if (filters.feature?.length) {
    const featureSet = new Set(filters.feature.map((f) => f.toLowerCase()));
    filtered = filtered.filter((item) => (item.features || []).some((f) => featureSet.has(String(f).toLowerCase())));
  }
  if (filters.minDownloads) {
    const min = Number(filters.minDownloads);
    if (Number.isFinite(min)) {
      filtered = filtered.filter((item) => Number(item.downloads || 0) >= min);
    }
  }

  const scored = filtered.map((item) => ({ item, score: scoreItem(item, query, fields, "name") }));
  const useDownloads = !query && (!sort || sort === "relevance");

  scored.sort((a, b) => {
    if (useDownloads || sort === "downloads") return (b.item.downloads || 0) - (a.item.downloads || 0);
    if (sort === "name") return String(a.item.name).localeCompare(String(b.item.name));
    return b.score - a.score;
  });

  const size = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
  const current = Math.max(Number(page) || 1, 1);
  const total = scored.length;
  const totalPages = Math.max(Math.ceil(total / size), 1);
  const start = (current - 1) * size;
  const end = start + size;

  return {
    page: current,
    pageSize: size,
    total,
    totalPages,
    results: scored.slice(start, end).map((entry) => ({ ...entry.item, score: entry.score })),
  };
}

export function searchSiteLocal(siteIndex, { query = "", type = [], page = 1, pageSize = 10, sort = "relevance" }) {
  const fields = [
    { key: "title", weight: 3.2 },
    { key: "excerpt", weight: 2.4 },
    { key: "tags", weight: 1.4 },
  ];

  let filtered = [...siteIndex];
  if (type?.length) {
    const typeSet = new Set(type.map((t) => t.toLowerCase()));
    filtered = filtered.filter((item) => typeSet.has(String(item.type).toLowerCase()));
  }

  const scored = filtered.map((item) => ({ item, score: scoreItem(item, query, fields, "title") }));

  scored.sort((a, b) => {
    if (sort === "name") return String(a.item.title).localeCompare(String(b.item.title));
    return b.score - a.score;
  });

  const size = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
  const current = Math.max(Number(page) || 1, 1);
  const total = scored.length;
  const totalPages = Math.max(Math.ceil(total / size), 1);
  const start = (current - 1) * size;
  const end = start + size;

  return {
    page: current,
    pageSize: size,
    total,
    totalPages,
    results: scored.slice(start, end).map((entry) => ({ ...entry.item, score: entry.score })),
  };
}
