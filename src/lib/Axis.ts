import * as d3 from "d3";
import _ from "lodash";

export default class Axis {
  private _listener: object;
  private _padding: number[];
  private _domain: any[];
  private _range: number[];
  private _rangeV: any[];
  private _pos: string;
  public scale: any;
  public axis: any;
  private type: any;

  /**
   * D3 Axis 생성 class
   * @param type D3 Axis type
   * @param pos Axis position (ex. left, bottom etc.)
   * @param d0 Start domain
   * @param d1 End domain
   * @param r0 Start range
   * @param r1 End range
   * @param p0 Start padding
   * @param p1 End padding
   */
  constructor(
    type: string,
    pos: string,
    d0?: number,
    d1?: number,
    r0?: number,
    r1?: number,
    p0?: number,
    p1?: number
  ) {
    this.scaleType(type);
    this.position(pos);
    this._listener = {};
    this._padding = [];
    this._domain = [];
    if (r0 && r1) {
      this._range = [r0, r1];
    } else {
      this._range = [];
    }
    this._rangeV = [];
    this._pos = pos;
    this.domain(d0, d1).padding(p0, p1);
    this.type = null;
  }

  /**
   * Set name
   * @param p
   * @param v
   * @example name("my", "apple") // myApple
   */
  public name(p: string, v: string) {
    return p + v.charAt(0).toUpperCase() + v.substr(1).toLowerCase();
  }

  /**
   * Set D3 scale
   * @param type D3 scale type
   */
  public scaleType(type: string) {
    this.scale = (d3 as any)[this.name("scale", (this.type = type))]();
    return this;
  }

  /**
   * Set axis time type format
   * @param v Format string
   * @param target Target item key
   */
  public timeFormat(v: string, target = "axis") {
    this[target as keyof Axis].tickFormat(d3.timeFormat(v));
    return this;
  }

  /**
   * Set axis tick size
   * @param size tick size
   * @param target target type
   */
  public tickSize(size: number, target = "axis") {
    (this as any)[target].tickSize(size);
    return this;
  }

  public tick(...a: any[]) {
    if (a.length === 1 && typeof a[0] === "string") {
      this.axis.ticks((d3 as any)[this.name("time", a[0])]);
    } else {
      this.axis.ticks.apply(this.axis, a);
    }
    return this;
  }

  public tickValues(arr: any[]) {
    if (!_.isArray(arr)) throw new Error("Please set array");
    this.axis.tickValues(arr);
    return this;
  }

  public position(pos: string, target = "axis") {
    (this as any)[target] = (d3 as any)[this.name("axis", pos)](this.scale);
    return this;
  }

  public setGrid(size: number) {
    const t = "grid";
    this.position(this._pos, t).tickSize(size, t).timeFormat("", t);
    return this;
  }

  public domain(d0?: any, d1?: any) {
    this._domain[0] = d0 || 0;
    this._domain[1] = d1 || 0;
    this.scale.domain(this._domain);
    return this;
  }

  public padding(v0?: number, v1?: number) {
    this._padding[0] = v0 || 0;
    this._padding[1] = v1 || 0;
    return this.range();
  }

  public tickFormat(func: (param: any) => void) {
    this.axis.tickFormat(func);
    return this;
  }

  public range(...a: any[]) {
    if (a.length === 2) {
      this._range[0] = a[0] || 0;
      this._range[1] = a[1] || 0;
    }
    this._rangeV[0] = this._range[0] + this._padding[0];
    this._rangeV[1] = this._range[1] - this._padding[1];
    this.scale.range(this._rangeV);
    return this;
  }

  public select(s: any, type: string) {
    if (s !== undefined) {
      (this as any)[type] = typeof s === "string" ? d3.select(s) : s;
    }
    return this;
  }

  public translate(
    tx: number | undefined,
    ty: number | undefined,
    type: string
  ) {
    let isUpdated = false;
    if (tx !== (this as any)[type].tx) {
      (this as any)[type].tx = tx;
      isUpdated = true;
    }
    if (ty !== (this as any)[type].ty) {
      (this as any)[type].ty = ty;
      isUpdated = true;
    }
    if (isUpdated) {
      (this as any)[type].attr(
        "transform",
        `translate(${(this as any)[type].tx}, ${(this as any)[type].ty})`
      );
    }
    return this;
  }

  public render(
    select: any | undefined,
    tx: number | undefined,
    ty: number | undefined,
    type = "_select",
    target = "axis"
  ) {
    if (select !== undefined) this.select(select, type).translate(tx, ty, type);
    (this as any)[type].call((this as any)[target]);
    return this;
  }

  public gridRender(
    select: any | undefined,
    tx: number | undefined,
    ty: number | undefined
  ) {
    this.render(select, tx, ty, "_grid", "grid");
    return this;
  }

  public listener(k: string, f: () => void) {
    if (f) {
      (this._listener as any)[k] = () => f.call(this);
      return this;
    }
    return (this._listener as any)[k];
  }
}
