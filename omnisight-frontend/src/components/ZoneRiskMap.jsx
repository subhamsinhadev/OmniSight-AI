import React from "react";

export default function ZoneRiskMap({ height = "520px" }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ height }}>
      <iframe 
        src="/heatmap.html" 
        title="Live Risk Zone Heatmap"
        width="100%" 
        height="100%" 
        style={{ border: "none", outline: "none" }}
      />
    </div>
  );
}
