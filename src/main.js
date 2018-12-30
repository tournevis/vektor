import { Vektor, dist, random, Quadtree } from './lib/index.js'
import { Point, Rect,  Circle } from './lib/geometry.js'
import Particle from './particle.js'
let ctx , canvas, qTree, lastCalledTime
let PARTICLES_ARRAY = []
let  mousePos = new Point(0,0)
const PARTICLE_NUM = 200

let setup = () => {
 	canvas = document.createElement('canvas')
 	canvas.height = 400
 	canvas.width = 400
 	let container = document.querySelector('#canvas-container')
 	container.append(canvas)
  canvas.addEventListener('mousemove', function (ev) {
    let rect = canvas.getBoundingClientRect()
    mousePos.x = ev.clientX - rect.left,
    mousePos.y = ev.clientY - rect.top
  })
 	ctx = canvas.getContext('2d')
  for (var i = 0; i <= PARTICLE_NUM; i++) {
  	PARTICLES_ARRAY.push(new Particle(Math.random() * 400,Math.random() * 400,ctx))
  }
  draw()
  /*
  let boundary = new Rect(10,10, 380, 380)
  qTree = new Quadtree(boundary, 8 )
  for (var i = 0; i < 190; i++) {
    let p = new Point(random(400), random(400))
    qTree.insert(p)
  }
  rangeDraw()*/
}

document.addEventListener("DOMContentLoaded", setup)

let rangeDraw = () => {
  ctx.clearRect(0, 0, 400, 400);
  ctx.strokeStyle= "#0F0"
  ctx.rect(mousePos.x - 50, mousePos.y - 50, 100, 100)
  ctx.stroke()
  ctx.strokeStyle= "#F00"
  qTree.show(ctx)
  var range = new Rect(mousePos.x - 50, mousePos.y - 50, 100, 100)
  var point = qTree.query(range)
  ctx.strokeStyle= "#00F"
  for (var i = 0; i < point.length; i++) {
      var p = point[i]
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      ctx.stroke();
  }
  window.requestAnimationFrame(rangeDraw)
}

let draw = () => {
	ctx.clearRect(0, 0, 400, 400);
  let boundary = new Rect(0, 0, 400, 400)
  qTree = new Quadtree(boundary, 6)
  for (var i = PARTICLES_ARRAY.length - 1; i >= 0; i--) {
    let p = PARTICLES_ARRAY[i]
    let point = new Point(p.position.x, p.position.y, p)
		p.edges()
		p.update()
    qTree.insert(point)
		p.draw()
  }

	for (var i = PARTICLES_ARRAY.length - 1; i >= 0; i--) {
    let p = PARTICLES_ARRAY[i]
    var range = new Circle(p.position.x, p.position.y, 100)
    var other = qTree.query(range)
		p.compute(other)
	}
  qTree.show(ctx)
	window.requestAnimationFrame(draw)
}
