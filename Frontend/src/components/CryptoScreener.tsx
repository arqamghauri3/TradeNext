'use client'
import React, { useEffect, useRef, memo } from "react";

function CryptoScreener() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "USD",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "height": 550
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
          href="https://www.tradingview.com/crypto-coins-screener/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">
            Cryptocurrency market by TradingView
          </span>
        </a>
      </div>
    </div>
  );
}

export default memo(CryptoScreener);
