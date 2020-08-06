import * as d3 from "d3";

/**
 * Xlog heatmap drag 이벤트 관리 class
 */
export default class Drag {
  private originX: number;
  private originY: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private _dragBox: any;
  private _min: number;
  private _max: number;
  private _xaxis: any;
  private _yaxis: any;
  private t: number;
  private l: number;
  private _drag: any;

  constructor(w: number, h: number, dragBox: any) {
    this.originX = 0;
    this.originY = 0;
    this.canvasWidth = w;
    this.canvasHeight = h;
    this._dragBox = dragBox;
    this._min = 0;
    this._max = 0;
    this._xaxis = null;
    this._yaxis = null;
    this.t = 0; // margin top
    this.l = 0; // margin left
  }

  /**
   * D3 drag 초기화 및 셋팅
   */
  public init() {
    this._drag = d3.drag();
    return this;
  }

  /**
   * 축(axis) setting
   * @param xaxis xaxis
   * @param yaxis yaxis
   */
  public set(xaxis: any, yaxis: any) {
    this._xaxis = xaxis;
    this._yaxis = yaxis;
    return this;
  }

  /**
   * Update canvas size
   * @param w Canvas width
   * @param h Canvas height
   */
  public updateSize(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;
    return this;
  }

  /**
   * Set canvas margin
   * @param t Top margin
   * @param l Left margin
   */
  public margin(t: number, l: number) {
    this.t = t;
    this.l = l;
    return this;
  }

  /**
   * Drag 이벤트 발생할때 실행 되는 메서드
   */
  public drag() {
    const t = this;

    // Drag 이벤트 발생 시 실행
    this._drag.on("drag", function (this: typeof Drag) {
      const that: any = this;
      const p = d3.mouse(that);
      let x = p[0] < t.originX ? p[0] : t.originX;
      let y = p[1] < t.originY ? p[1] : t.originY;

      x = x > 0 ? x : 0;
      let width = 0;

      if (p[0] > t.originX) {
        width = Math.abs(p[0] - t.originX);
      } else {
        width = Math.abs(x - t.originX);
      }

      if (x + width > t.canvasWidth) {
        width = t.canvasWidth - x;
      }

      y = y > 0 ? y : 0;
      let height = 0;
      if (p[1] > t.originY) {
        height = Math.abs(p[1] - t.originY);
      } else {
        height = Math.abs(y - t.originY);
      }

      if (y + height > t.canvasHeight) {
        height = t.canvasHeight - y;
      }
      t.setPosition(x, y, width, height);
    });

    return this;
  }

  /**
   * Drag box position. Drag시 영역 표시를 위한 좌표
   * @param l left
   * @param t top
   * @param w width
   * @param h height
   */
  public setPosition(l: number, t: number, w: number, h: number) {
    this._dragBox.style.left = `${l + this.l}px`;
    this._dragBox.style.top = `${t + this.t}px`;
    this._dragBox.style.width = `${w}px`;
    this._dragBox.style.height = `${h}px`;
    return this;
  }

  /**
   * Drag 시작할때 발생하는 event binding.
   */
  public start() {
    const t = this;
    this._drag.on("start", function (this: typeof Drag) {
      const that: any = this;
      const p = d3.mouse(that);
      t.originX = p[0];
      t.originY = p[1];
      t.setPosition(t.originX, t.originY, 0, 0);
    });
    return this;
  }

  /**
   * Get drag box style
   * @param pos position(left, top etc...)
   */
  public getStyle(pos: any) {
    // tslint:disable-next-line: radix
    return parseInt(this._dragBox.style[pos]);
  }

  /**
   * Get D3 drag
   */
  public getDrag() {
    return this._drag;
  }

  /**
   * 최대 시간 지정
   * @param time x축 최대 time 값
   */
  public setMaxTime(time: number) {
    this._max = time;
    return this;
  }

  /**
   * 최소 시간 지정
   * @param time x축 최소 time 값
   */
  public setMinTime(time: number) {
    this._min = time;
    return this;
  }

  /**
   * Drag 마쳤을때 발생하는 이벤트 drag된 영역 정보를 포함하여 callback을 실행시켜준다.
   * @param callback callback 함수
   */
  public end(callback: (p: any) => void) {
    const t = this;
    // tslint:disable-next-line: only-arrow-functions
    this._drag.on("end", function () {
      const dragGap = t._yaxis.invert(t.canvasHeight - t.t);
      // 시작 시간
      const startTime = t._xaxis.invert(t.getStyle("left") - t.l);
      // 끝나는 시간
      const endTime = t._xaxis.invert(
        t.getStyle("left") + t.getStyle("width") - t.l
      );

      let minTime = t._yaxis.invert(
        t.getStyle("top") + t.getStyle("height") - t.t
      );
      let maxTime = t._yaxis.invert(t.getStyle("top") - t.t);

      const gap = dragGap * 100;

      minTime = Math.floor(minTime * 1000 - gap);
      maxTime = Math.floor(maxTime * 1000);

      if (maxTime >= t._max * 1000) {
        maxTime = -1;
      }

      if (minTime < 0) minTime = 0;

      // 선택된 area 정보
      const selectArea = {
        fromTime: startTime.getTime(),
        toTime: endTime.getTime() + 1000,
        fromElapsed: minTime,
        toElapsed: maxTime,
      };

      callback(selectArea);

      setTimeout(() => {
        t.setPosition(0, 0, 0, 0);
      }, 100);
    });
    return this;
  }
}
