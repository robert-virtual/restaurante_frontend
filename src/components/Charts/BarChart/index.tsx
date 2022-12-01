import * as d3 from "d3";
import React, { RefObject, useEffect, useRef, useState } from "react";
export interface IBarChartProps {
  data: [number | string, number][];
  height: number;
  width: number;
  showYAxis?: boolean;
  yLabel?: string;
  colors?: string[];
  backgroundColor?: string;
}
const BarChart = ({
  height = 500,
  width = 600,
  data = [],
  showYAxis = false,
  yLabel = "",
  colors = [],
  backgroundColor
}: IBarChartProps) => {
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
    const chartMargin = height / 8;
    const chartWidth = width - chartMargin - chartMargin;
    const chartHeight = height - chartMargin - chartMargin;
    let chart = d3.select(d3Ref.current).select("svg");
    let xScale = d3.scaleBand().range([0, chartWidth]).padding(0.4);
    let yScale = d3.scaleLinear().range([chartHeight, 0]);
    xScale.domain(data.map((d) => String(d[0])));
    yScale.domain([0, d3.max(data, (d) => Number(d[1])) as number]);
    d3.select(d3Ref.current).select("svg").selectAll("*").remove();

    chart.append("g")
      .append("rect")
      .attr("width", chartWidth + 2 * chartMargin)
      .attr("height", chartHeight + 2 * chartMargin)
      .attr("fill", ()=>backgroundColor||"none")

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
          .tickFormat((d) => showYAxis?String(d):"")
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(yLabel);

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(String(d[0])) as number)
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d[1]))
      .attr("fill", (d, i) => colors[i] || "steelblue");

    g.selectAll("text.bar")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar")
      .attr("x", (d) => (xScale(String(d[0])) as number) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d[1]) - (chartMargin * 0.1))
      .attr("text-anchor", "middle")
      .attr("font-size", "10")
      .text((d) => String(d[1]));
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

export default BarChart;
