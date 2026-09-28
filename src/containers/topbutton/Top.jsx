import React, {useEffect, useState} from "react";
import "./Top.scss";

export default function Top() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth"
        })
      }
      id="topButton"
      title="Go to top"
      type="button"
      style={{visibility: visible ? "visible" : "hidden"}}
    >
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}
