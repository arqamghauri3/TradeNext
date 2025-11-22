"use client";
import React, { useEffect, useRef, memo } from "react";

function AdvanceChartWidget({ height }: { height?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": true,
          "details": true,
          "hide_side_toolbar": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "240",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "OANDA:XAUUSD",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [
            "BINANCE:BTCUSDT",
            "OANDA:XAUUSD",
            "OANDA:NAS100USD"
          ],
          "withdateranges": true,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
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
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: height, width: "100%" }}
    >
      {/* TradingView widget will be injected here by the script */}
    </div>
  );
}

export default memo(AdvanceChartWidget);
