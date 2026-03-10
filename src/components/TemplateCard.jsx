import { useDownloadsApi } from "../hooks";
import { Icon } from "./Icon";

export function TemplateCard({ t, setPage, setSelected }) {
  const { count, download, clicked } = useDownloadsApi(t.id, t.downloads, t.repoUrl);
  return (
    <div className="card template-card">
      <div className="template-card-img">
        <img src={t.images[0]} alt={t.name} loading="lazy" />
        <div className="template-card-overlay">
          <button className="btn btn-primary btn-sm" onClick={() => { setSelected(t); setPage("detail"); window.scrollTo({top:0}); }}>
            <Icon name="eye"/> Preview
          </button>
          <button className={`btn btn-sm ${clicked ? "btn-ghost" : "btn-secondary"}`} onClick={download}>
            <Icon name="download"/> {clicked ? "Downloaded!" : "Free Download"}
          </button>
        </div>
      </div>
      <div className="template-card-body">
        <div className="template-card-meta">
          <span className="badge badge-accent">{t.category}</span>
          <span className="download-count"><Icon name="download"/> {count.toLocaleString()}</span>
        </div>
        <div className="template-card-name">{t.name}</div>
        <p className="template-card-desc">{t.desc}</p>
        <div className="template-card-footer">
          <button className="btn btn-primary btn-sm" style={{ flex:1 }} onClick={download}>
            {clicked ? "✓ Downloaded" : "Free Download"}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setSelected(t); setPage("detail"); window.scrollTo({top:0}); }}>
            View →
          </button>
        </div>
      </div>
    </div>
  );
}
