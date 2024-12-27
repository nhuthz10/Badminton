"use client";
import React, { useEffect, useRef, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function Chart({ chartData, xLabels }) {
  const [widthStatisticResult, setWidthStatisticResult] = useState(0);

  const statisticRef = useRef();

  const getWidthStatisticResult = () => {
    if (statisticRef.current) {
      setWidthStatisticResult(statisticRef.current.offsetWidth - 50);
      const chartInnerDiv = statisticRef.current.querySelector("div");
      if (chartInnerDiv) {
        chartInnerDiv.style.width = `${statisticRef.current.offsetWidth}px`;
      }
    }
  };

  useEffect(() => {
    getWidthStatisticResult();
    window.addEventListener("resize", getWidthStatisticResult);

    return () => {
      window.removeEventListener("resize", getWidthStatisticResult);
    };
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      ref={statisticRef}
      className="wrap-chart"
    >
      <BarChart
        height={450}
        width={widthStatisticResult}
        series={[{ data: chartData, id: "revenueId" }]}
        xAxis={[{ data: xLabels, scaleType: "band", categoryGapRatio: 0.5 }]}
      />
    </div>
  );
}

export default Chart;
