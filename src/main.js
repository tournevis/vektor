import { Vektor, dist, random, Quadtree } from './lib/index.js'
import { Point, Rect } from './lib/geometry.js'
import Particle from './particle.js'
let ctx , canvas, qTree
let PARTICLES_ARRAY = []
let  mousePos = new Point(0,0)
const PARTICLE_NUM = 80


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
  /*
   	for (var i = 0; i <= PARTICLE_NUM; i++) {
   		PARTICLES_ARRAY.push(new Particle(ctx))
   	}
   	draw()
  */
  let boundary = new Rect(10,10, 380, 380)
  qTree = new Quadtree(boundary, 8 )
  for (var i = 0; i < 190; i++) {
    let p = new Point(random(400), random(400))

    qTree.insert(p)
  }

  rangeDraw()
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
	for (var i = PARTICLES_ARRAY.length - 1; i >= 0; i--) {
		PARTICLES_ARRAY[i].edges()
		PARTICLES_ARRAY[i].compute(PARTICLES_ARRAY)
		PARTICLES_ARRAY[i].update()
		PARTICLES_ARRAY[i].draw()
	}
	window.requestAnimationFrame(draw)
}
