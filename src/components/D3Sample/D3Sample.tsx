import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
const data = [4, 8, 15, 16, 23, 42];
const width = 600;
const height = 600;
const margin = ({top: 20, right: 30, bottom: 30, left: 40});
const D3Sample = ()=>{
  const sample = useRef(null);
  const scatterplot = useRef(null);
  const sampleInit = ()=> {

    const div = d3.select(sample.current).append("div")
      .style("font", "10px sans-serif")
      .style("text-align", "right")
      .style("color", "white");

    div.selectAll("div")
      .data(data)
      .join("div")
      .style("background", "steelblue")
      .style("padding", "3px")
      .style("margin", "1px")
      .style("width", d => `${d * 10}px`)
      .text(d => d);

    return div.node();
  };

  const scatterplotInit = ()=> {

    const svg = d3.select(scatterplot.current).append("svg")
      .attr("viewBox", "0, 0, 600, 600")
      .property("value", []);

    return svg.node();
  };
  useEffect(()=>{
    sampleInit();
    scatterplotInit();
  },[])
  return (
    <div>
      D3Sample
      <div ref={sample}></div>
      <div ref={scatterplot}></div>
    </div>
  )
}

export default D3Sample;
