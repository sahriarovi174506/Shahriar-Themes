import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDownloadsApi } from "../hooks";
import { scrollToTop } from "../utils/scroll";
import { Icon } from "./Icon";

function TemplateCardComponent({ t, setSelected }) {
  const navigate = useNavigate();
  const { count, download, clicked } = useDownloadsApi(t.id, 0, t.repoUrl, { fetchOnMount: true });
  
  const goDetail = useCallback(() => {
    setSelected(t);
    navigate(`/templates/${t.id}`);
    scrollToTop({ immediate: true });
  }, [navigate, setSelected, t]);

  const openPreview = useCallback(() => {
    window.open(t.previewUrl, "_blank", "noopener,noreferrer");
  }, [t.previewUrl]);

  return (
    <div className={`card template-card ${t.isComingSoon ? "coming-soon" : ""}`}>
      <div className="template-card-img">
        <img src={t.images[0]} alt={t.name} loading="lazy" decoding="async" fetchPriority="low" />
        {t.isComingSoon && <div className="coming-soon-overlay">Coming Soon</div>}
      </div>
      <div className="template-card-body">
        <div className="template-card-meta">
          <span className="badge badge-accent">{t.category}</span>
          {!t.isComingSoon && (
            <span className="download-count">
              <Icon name="download" /> {count.toLocaleString()}
            </span>
          )}
        </div>
        <div className="template-card-name">{t.name}</div>
        <p className="template-card-desc">{t.desc}</p>
        <div className="template-card-footer template-card-footer--actions">
          {t.isComingSoon ? (
            <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center" }} disabled>
              Available Soon
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-sm justify-center" style={{ flex: 1 }} onClick={download}>
                {clicked ? "Downloaded" : "Download"}
              </button>
              <button
                className="btn btn-preview btn-sm"
                onClick={openPreview}
              >
                <Icon name="eye" /> Preview
              </button>
              <button className="btn btn-ghost btn-sm" onClick={goDetail}>
                View <Icon name="arrow" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const TemplateCard = memo(TemplateCardComponent);
