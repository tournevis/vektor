import {Point, Rect} from './geometry.js'

export default class Quadtree {
  constructor (boundary, capacity) {
    this.boundary = boundary
    this.capacity = capacity
    this.points = []
    this.divided = false;
  }
  contains (p){
    return  p.x <= this.boundary.x + this.boundary.width &&
            p.x >= this.boundary.x &&
            p.y <= this.boundary.y+this.boundary.height &&
            p.y >= this.boundary.y;
   }
  subdivide () {
    let x = this.boundary.x
    let y = this.boundary.y
    let w = this.boundary.width / 2
    let h = this.boundary.height / 2
    this.northeast = new Quadtree(new Rect(x + w, y, w, h), this.capacity)
    this.northwest = new Quadtree(new Rect(x, y, w, h), this.capacity)
    this.southeast = new Quadtree(new Rect(x + w, y + h, w, h), this.capacity)
    this.southwest = new Quadtree(new Rect(x, y + h, w, h), this.capacity)
    this.divided = true
  }
  insert (point) {
    if (!this.contains(point)) return false
    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide()
      }
      if (this.northeast.insert(point)){
        return true
      }
      else if (this.northwest.insert(point)){
        return true
      }
      else if (this.southeast.insert(point)){
        return true
      }
      else if(this.southwest.insert(point)){
        return true
      }
    }
  }
  query (range, result) {
    if (!result) {
      result = []
    }
    if (!this.boundary.intersects(range)) {
      return
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          result.push(p);
        }
      }
      if (this.divided) {
        this.northwest.query(range, result);
        this.northeast.query(range, result);
        this.southwest.query(range, result);
        this.southeast.query(range, result);
      }
      return result
    }
  }
  show (ctx) {
    if(!ctx) return;
    ctx.strokeStyle ='#FF0000';
    for (var i = 0; i < this.points.length; i++) {
      let p = this.points[i]
      ctx.beginPath();

      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
    ctx.strokeStyle ='#000';
    ctx.rect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height)
    ctx.stroke()
    if (this.divided){
     this.northeast.show(ctx)
     this.northwest.show(ctx)
     this.southeast.show(ctx)
     this.southwest.show(ctx)
    }
  }
}
