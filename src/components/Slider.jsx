import { useState, useRef, useEffect } from "react";
import { useSlider } from "../hooks";
import { Icon } from "./Icon";

export function Slider({ children, perView = 3, gap = 24, auto = false }) {
  const total = children.length;
  const { idx, prev, next, go } = useSlider(total, auto);
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const update = () => { if (ref.current) setWidth(ref.current.offsetWidth); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const visible = width < 640 ? 1 : width < 1024 ? 2 : perView;
  const itemW = (width - gap * (visible - 1)) / visible;
  const offset = idx * (itemW + gap);
  return (
    <div>
      <div ref={ref} className="slider-wrapper">
        <div className="slider-track" style={{ transform:`translateX(-${offset}px)`, gap:`${gap}px` }}>
          {children.map((child, i) => (
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
