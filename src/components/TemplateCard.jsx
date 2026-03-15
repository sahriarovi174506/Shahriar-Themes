import { useDownloadsApi } from "../hooks";
import { Icon } from "./Icon";

export function TemplateCard({ t, setPage, setSelected }) {
  const { count, download, clicked } = useDownloadsApi(t.id, t.downloads, t.repoUrl);
  const goDetail = () => {
    setSelected(t);
    setPage("detail");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="card template-card">
      <div className="template-card-img">
        <img src={t.images[0]} alt={t.name} loading="lazy" />
      </div>
      <div className="template-card-body">
        <div className="template-card-meta">
          <span className="badge badge-accent">{t.category}</span>
          <span className="download-count">
            <Icon name="download" /> {count.toLocaleString()}
          </span>
        </div>
        <div className="template-card-name">{t.name}</div>
        <p className="template-card-desc">{t.desc}</p>
        <div className="template-card-footer template-card-footer--actions">
          <button className="btn btn-primary btn-sm justify-center" style={{ flex: 1 }} onClick={download}>
            {clicked ? "Downloaded" : "Download"}
          </button>
          <button
            className="btn btn-preview btn-sm"
            onClick={() => window.open(t.previewUrl, "_blank", "noopener,noreferrer")}
          >
            <Icon name="eye" /> Preview
          </button>
          <button className="btn btn-ghost btn-sm" onClick={goDetail}>
            View <Icon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
