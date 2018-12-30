export class Point {
  constructor(x, y, ref) {
    this.x = x || 0
    this.y = y || 0
    this.ref = ref
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
export class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  intersects(range) {

    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    // radius of the circle
    let r = this.r;

    let w = range.w;
    let h = range.h;

    let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

    // no intersection
    if (xDist > (r + w) || yDist > (r + h))
      return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h)
      return true;
    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}
