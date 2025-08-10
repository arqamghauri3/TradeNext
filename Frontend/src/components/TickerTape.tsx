'use client'
import React, { useEffect, useRef, memo } from "react";

function TickerTape() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500 Index"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100 Cash CFD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "OANDA:XAUUSD",
              "title": "XAUUSD"
            }
          ],
          "colorTheme": "dark",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": true,
          "showSymbolLogo": true,
          "displayMode": "adaptive"
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
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Ticker tape by TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TickerTape);
