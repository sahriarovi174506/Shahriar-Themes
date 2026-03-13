export const Icon = ({ name }) => {
  const icons = {
    download: "⬇", eye: "👁", arrow: "→", check: "✓", close: "✕", plus: "+",
    code: "⌨", layout: "⊞", briefcase: "💼", mail: "✉", phone: "📞",
    globe: "🌐", star: "★", quote: "❝", rocket: "🚀", shield: "🛡",
    zap: "⚡", heart: "♥", users: "👥", chart: "📊", sparkle: "✦",
    chevL: "‹", chevR: "›", up: "↑", menu: "☰", external: "↗",
    figma: "🎨", nextjs: "▲", react: "⚛", node: "🟢",
    github: "🐙", facebook: "📘", whatsapp: "💬",
  };
  return <span style={{ fontSize: "inherit" }}>{icons[name] || "•"}</span>;
};
