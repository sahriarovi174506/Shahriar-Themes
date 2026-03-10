import { useState, useRef, useEffect } from "react";

export function AnimCount({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { 
            setVal(target); 
            clearInterval(t); 
          } else {
            setVal(Math.floor(start));
          }
        }, 20);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  // Format large numbers (e.g., 7800 -> 7.8k)
  const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toLocaleString();
  };

  return (
    <span ref={ref}>
      {formatNumber(val)}
      {suffix && <span className="suffix">{suffix}</span>}
    </span>
  );
}
