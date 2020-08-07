import React, { useEffect, useRef } from "react";
import Drag from "../../lib/Drag";
import Canvas from "../../lib/Canvas";
import Axis from "../../lib/Axis";
import * as d3 from 'd3';
import "./Xlog.css";
const setting = {
  timeFormat: "%H:%M:%S",
  margin: { top: 10, left: 40, right: 0, bottom: 0 },
  x: { height: 20, width: 30 }, // x linear
  y: { height: 30, width: 30 }, // y linear
  step: 1, // 현재 scale step
};

const width =500;
const height =500;
export default function Xlog() {
  const xlogElement = useRef<HTMLDivElement | null >(null);
  const dragBox = useRef<HTMLDivElement| null>(null);
  const dragWrapper = useRef<HTMLDivElement|null>(null);
  const render = () => {
    //실제 TunA에서는 Heatmap.tsx의 Initialize하는 부분임
    if(!xlogElement) return;

    const svg= d3.select(xlogElement.current)
      .append("svg")
      .attr("width", width+setting.margin.left+setting.y.width)
      .attr("height", height+setting.margin.top+setting.x.height)
      .style("position","relative")
      .style("z-index",5)
      .append("g").attr("transform",`translate(${setting.margin.left},${setting.margin.top})`);
    const x = svg.append("g").attr("class","x-axis");
    const y = svg.append("g").attr("class","y-axis");

    const xGrid = svg.append("g").style("opacity","0.5");
    const yGrid = svg.append("g").style("opacity","0.5");

    const xaxis = new Axis("linear","bottom")
      .range(0,500)
      .domain(0,10)
      .setGrid(-height)
      .gridRender(xGrid,0, width)
      .render(x,0,500);

    const yaxis = new Axis("linear", "left")
      .range(500,0)
      .domain(0,10)
      .setGrid(-height)
      .gridRender(yGrid,0,0)
      .render(y,undefined,undefined);

    const handleDrag = (selection:any) => {
      console.log(selection);
    };

    const drag = new Drag(width, height, dragBox.current)
      .init()
      .setMaxTime(1000)
      .setMinTime(0)
      .set(xaxis.scale,yaxis.scale)
      .margin(setting.margin.top, setting.margin.left)
      .drag()
      .start()
      .end(handleDrag);

    const dragCanvas = new Canvas(dragWrapper.current)
      .init()
      .size(width, height)
      .position(setting.margin.top, setting.margin.left)
      .call(drag.getDrag());

    const canvas = new Canvas(xlogElement.current).init()
      .size(width, height)
      .position(setting.margin.left+1.5, setting.margin.left);



  };

  useEffect(()=>{
    render();
  },[]);



  return (
    <div>Xlog
      <div className="wrapper">
        <div className="xlog-wrapper" ref={xlogElement}>
          <div className="drag-box" ref={dragBox}></div>
          <div className="drag-wrapper" ref={dragWrapper}></div>

        </div>

      </div>

    </div>
  )
}
