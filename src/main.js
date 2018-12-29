import { Vektor, dist, random, Quadtree } from './lib/index.js'
import { Point, Rect } from './lib/geometry.js'
import Particle from './particle.js'
let ctx , canvas
let PARTICLES_ARRAY = []
const PARTICLE_NUM = 80


let setup = () => {
 	canvas = document.createElement('canvas')
 	canvas.height = 400
 	canvas.width = 400
 	let container = document.querySelector('#canvas-container')
 	container.append(canvas)
 	ctx = canvas.getContext('2d')
  /*
   	for (var i = 0; i <= PARTICLE_NUM; i++) {
   		PARTICLES_ARRAY.push(new Particle(ctx))
   	}
   	draw()
  */
  let boundary = new Rect(10,10, 380, 380)
  let qTree = new Quadtree(boundary, 5)
  for (var i = 0; i < 190; i++) {
    let p = new Point(random(400), random(400))
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    qTree.insert(p)
  }
  qTree.show(ctx)
}

document.addEventListener("DOMContentLoaded", setup)

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
