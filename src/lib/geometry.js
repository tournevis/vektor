export class Point {
  constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
  }
}
export class Rect {
  constructor(x, y, width, height) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
  }
  intersects(range) {
    return !(range.x > this.x + this.width ||
      range.x + range.width < this.x  ||
      range.y  > this.y + this.height ||
      range.y + range.height < this.y);
  }
  contains(point) {
    return (point.x >= this.x  &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height);
  }
}
