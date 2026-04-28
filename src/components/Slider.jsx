import { useState, useRef, useEffect, useMemo } from "react";
import { Children } from "react";
import { useSlider } from "../hooks";
import { Icon } from "./Icon";

export function Slider({ children, perView = 3, gap = 24, auto = false }) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const total = items.length;
  const { idx, prev, next, go } = useSlider(total, auto);
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = null;
    const update = () => {
      frame = null;
      setWidth(el.offsetWidth);
    };
    update();

    const resizeObserver = new ResizeObserver(() => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const visible = width < 640 ? 1 : width < 1024 ? 2 : perView;
  const itemW = visible > 0 ? (width - gap * (visible - 1)) / visible : 0;
  const offset = idx * (itemW + gap);
  return (
    <div>
      <div ref={ref} className="slider-wrapper">
        <div className="slider-track" style={{ transform:`translateX(-${offset}px)`, gap:`${gap}px` }}>
          {items.map((child, i) => (
            <div key={i} className="slider-item" style={{ width:`${itemW}px`, minWidth:`${itemW}px` }}>{child}</div>
          ))}
        </div>
      </div>
      <div className="slider-controls">
        <button className="slider-btn" onClick={prev}><Icon name="chevL"/></button>
        <div className="slider-dots">
          {Array.from({ length: Math.max(1, total - visible + 1) }).map((_, i) => (
            <div key={i} className={`slider-dot ${i === idx ? "active" : ""}`} onClick={() => go(i)} />
          ))}
        </div>
        <button className="slider-btn" onClick={next}><Icon name="chevR"/></button>
      </div>
    </div>
  );
}
