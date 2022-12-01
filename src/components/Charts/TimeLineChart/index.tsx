import * as d3 from "d3";
import React, { RefObject, useEffect, useRef, useState } from "react";
export interface ITimeLineChartProps {
  data?: [Date[], number[][]];
  height: number;
  width: number;
  showYAxis?: boolean;
  yLabel?: string;
  colors?: string[];
  backgroundColor?: string;
  showPoints?: boolean;
}
const TimeLineChart = ({
  height = 500,
  width = 600,
  data,
  showYAxis = false,
  yLabel = "",
  colors = [],
  backgroundColor,
  showPoints = false,
}: ITimeLineChartProps) => {
  const d3Ref: RefObject<HTMLDivElement> = useRef(null);
  const drawCanvas = () => {
    if (!d3Ref.current?.hasChildNodes()) {
      d3.select(d3Ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }
  };
  const drawChart = () => {
    const [dates, series] = data || [[], []];
    const chartMargin = height / 8;
    const chartWidth = width - chartMargin - chartMargin;
    const chartHeight = height - chartMargin - chartMargin;
    let chart = d3.select(d3Ref.current).select("svg");
    let xScale = d3.scaleTime().range([0, chartWidth]);
    let yScale = d3.scaleLinear().range([chartHeight, 0]);
    //xScale.domain(data.map((d) => d.date));
    xScale.domain(d3.extent(dates, (d) => d) as [Date, Date]);

    let yGlobalData: number[] = [];
    series.forEach((s) => {
      yGlobalData = yGlobalData.concat(s);
    });

    yScale.domain(d3.extent(yGlobalData, (d) => d) as [number, number]);

    d3.select(d3Ref.current).select("svg").selectAll("*").remove();

    chart
      .append("g")
      .append("rect")
      .attr("width", chartWidth + 2 * chartMargin)
      .attr("height", chartHeight + 2 * chartMargin)
      .attr("fill", () => backgroundColor || "none");

    let g = chart
      .append("g")
      .attr("transform", `translate(${chartMargin}, ${chartMargin})`);

    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => (showYAxis ? String(d) : ""))
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(yLabel);
    series.forEach((s, i) => {
      g.append("path")
        .datum(s)
        .attr("fill", "none")
        .attr("stroke", colors[i] || "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3.line(
            (d, k) => xScale(dates[k]),
            (d) => yScale(d)
          )
        );
      if (showPoints) {
        g.selectAll("text.path")
          .data(s)
          .enter()
          .append("text")
          .attr("class", "bar")
          .attr("x", (d, k) => xScale(dates[k]) as number)
          .attr("y", (d) => yScale(d) - chartMargin * 0.1)
          .attr("text-anchor", "middle")
          .attr("font-size", "10")
          .text((d) => String(d));
      }
    });
  };
  useEffect(() => {
    drawCanvas();
    drawChart();
  }, [d3Ref]);

  return (
    <>
      <div ref={d3Ref} />
    </>
  );
};

export default TimeLineChart;
