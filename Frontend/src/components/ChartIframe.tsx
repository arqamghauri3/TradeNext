import React from "react";

const ChartIframe = () => {
  return (
    <iframe
      src="https://www.tradingview.com/chart"
      sandbox="allow-scripts allow-same-origin"
      referrerPolicy="no-referrer"
      style={{ width: "100%", height: "600px", border: "none" }}
    />
  );
};

export default ChartIframe;
