import * as d3 from "d3";

export default class Canvas {
  private selector: any;
  private _canvas: any;
  private _parent: any;

  /**
   * Canvas 생성 class
   * @param selector D3 selector
   */
  constructor(selector: any) {
    this.selector = selector;
    this._parent = null;
    this._canvas = null;
  }

  /**
   * 부모 element에 canvas 추가
   */
  public init() {
    this._canvas = this.parentNode()._parent.append("canvas");
    return this;
  }

  /**
   * Set parent element node
   */
  public parentNode() {
    this._parent = d3
      .select(this.selector)
      .append("div")
      .attr("class", "canvas")
      .style("position", "absolute")
      .style("top", "0px")
      .style("left", "0px");
    return this;
  }

  /**
   * Set canvas width and height
   * @param w width
   * @param h height
   */
  public size(w: number, h: number) {
    this._canvas.attr("height", h).attr("width", w);
    return this;
  }

  /**
   * Clear canvas
   */
  public clear() {
    const canvas: any = d3.select(this.selector).select("canvas").node();
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
    return this;
  }

  /**
   * Set canvas position
   * @param t top
   * @param l left
   */
  public position(t: number, l: number) {
    this._canvas
      .style("position", "absolute")
      .style("top", `${t}px`)
      .style("left", `${l}px`);
    return this;
  }

  /**
   * Get canvas context
   * @param space Canvas space (ex. 2d)
   */
  public getContext(space: any) {
    if (typeof space !== "string") throw new Error("please set string");
    if (!this._canvas) {
      return this.init()._canvas.node().getContext(space);
    }
    return this._canvas.node().getContext(space);
  }

  /**
   * Call canvas
   * @param param call param
   */
  public call(param: any) {
    this._canvas.call(param);
    return this;
  }
}
