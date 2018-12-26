import vektor from './index.js'
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
 	for (var i = 0; i <= PARTICLE_NUM; i++) {
 		PARTICLES_ARRAY.push(new Particle(ctx))
 	}
 	draw()

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