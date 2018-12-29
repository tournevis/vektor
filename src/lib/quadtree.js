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
  show (ctx) {
    if(!ctx) return;
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
