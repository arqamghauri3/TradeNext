'use client'
import React, { useEffect, useRef, memo } from "react";

function TopStories() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "all_symbols",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "height": "100%"
        }`;
    if (container.current) {
      // Clear any existing content before adding new script
      container.current.innerHTML = "";
      container.current.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/news-flow/?priority=top_stories"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Top stories by TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TopStories);
