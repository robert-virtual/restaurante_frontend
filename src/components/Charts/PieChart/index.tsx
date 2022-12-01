import * as d3 from "d3";
import { DefaultArcObject, PieArcDatum } from "d3";
import React, { RefObject, useEffect, useRef, useState } from "react";
export interface IPieChartProps {
  data: [number | string, number][];
  height: number;
  width: number;
  showYAxis?: boolean;
  yLabel?: string;
  colors?: string[];
  backgroundColor?: string;
}
const PieChart = ({
  height = 500,
  width = 600,
  data = [],
  showYAxis = false,
  yLabel = "",
  colors = [],
  backgroundColor,
}: IPieChartProps) => {
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
    const chartMargin = Math.max(height / 8, 50);
    const chartWidth = width - chartMargin - chartMargin;
    const chartHeight = height - chartMargin - chartMargin;
    const chartRadius = Math.min(chartWidth, chartHeight) / 2;

    let chart = d3.select(d3Ref.current).select("svg");
    d3.select(d3Ref.current).select("svg").selectAll("*").remove();
    const canvas = chart.append("g");

    canvas.append("g").attr("class", "slices");
    canvas.append("g").attr("class", "labels");
    canvas.append("g").attr("class", "lines");

    const pie = d3
      .pie<[number | string, number]>()
      .sort(null)
      .value((d) => d[1]);

    console.log(pie(data));

    const arc = d3
      .arc()
      .outerRadius(chartRadius * 0.8)
      .innerRadius(chartRadius * 0.4);

    const outerArc = d3
      .arc()
      .innerRadius(chartRadius * 0.9)
      .outerRadius(chartRadius * 0.9);

    canvas.attr(
      "transform",
      `translate(${chartWidth / 2 + chartMargin}, ${
        chartHeight / 2 + chartMargin
      })`
    );

    let xScale = d3.scaleBand().range([0, chartWidth]).padding(0.4);
    let yScale = d3.scaleLinear().range([chartHeight, 0]);
    xScale.domain(data.map((d) => String(d[0])));
    yScale.domain([0, d3.max(data, (d) => Number(d[1])) as number]);

    const key = (d: any) => d.data[0];

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => String(d[0])))
      .range(colors);

    const slice = canvas
      .select(".slices")
      .selectAll("path.slice")
      .data(pie(data), key);

    slice
      .enter()
      .append("path")
      .style("fill", (d: any) => colorScale(d.data[0]) as string)
      .attr("class", "slice")
      .attr("d", (d: any) => arc(d));

    slice.exit().remove();

    const text = canvas
      .select(".labels")
      .selectAll("text")
      .data(pie(data), key);

    text
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d: any) => d.data[0])
      .attr("transform", (d: PieArcDatum<[number|string, number]>) => {
        const pos = outerArc.centroid(d as any);
        pos[0] = chartRadius * ( (d.startAngle + (d.endAngle - d.startAngle)/2) < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d: any) => {
        return (d.startAngle + (d.endAngle - d.startAngle)/2) < Math.PI ? "start" : "end";
      });
    text.exit().remove();

    const polyline = canvas
      .select(".lines")
      .selectAll("polyline")
      .data(pie(data), key);

    polyline
      .enter()
      .append("polyline")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("points",
        (d: any): any => {
          const pos = outerArc.centroid(d as any);
          pos[0] = chartRadius * 0.95 * ( (d.startAngle + (d.endAngle - d.startAngle)/2) < Math.PI ? 1 : -1);
          return [arc.centroid(d as any), outerArc.centroid(d as any), pos];
        }
      );
    polyline.exit().remove();
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

export default PieChart;
