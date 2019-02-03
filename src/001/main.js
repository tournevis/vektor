import { Vektor, dist, random, Quadtree } from '@/lib/index.js'
import { Point, Rect,  Circle } from '@/lib/geometry.js'
import { noise } from '@/lib/noise.js'
import forceVektor from './forceVektor.js'
import Particle from './particle.js'
import SimplexNoise from 'simplex-noise'

var simplex = new SimplexNoise()
let ctx , canvas, qTree, lastCalledTime
let PARTICLES_ARRAY = []
let FORCE_ARRAY = []
let  mousePos = new Point(0,0)
let PARTICLE_NUM = 30
const CANVAS_SIZE = 600
let rangeQuery = 80
let period = 1 / 800;
let TWO_PI = 2 * Math.PI;
let forceSliders = [1,1,1]
let forceCheckboxes = [true, true, true]
let scale = 100
let setup = () => {
  noise.seed(Math.random())
 	canvas = document.createElement('canvas')
 	canvas.height = CANVAS_SIZE
 	canvas.width = CANVAS_SIZE

  let container = document.querySelector('#canvas-container')
  container.append(canvas)
  ctx = canvas.getContext('2d')
  for (var x = 30; x < canvas.width - 20; x+= 20) {
    for (var y = 30; y < canvas.height - 20; y+= 20) {
      var angle = noise.simplex2(x / CANVAS_SIZE  , y / CANVAS_SIZE ) * TWO_PI
      FORCE_ARRAY.push(new forceVektor(x, y, ctx, new Vektor( -Math.abs(Math.cos(angle)) *10,  Math.abs(Math.sin(angle)) *10)))
    }
  }
  for (var i = 0; i <= PARTICLE_NUM; i++) {
  	PARTICLES_ARRAY.push(new Particle(Math.random() * CANVAS_SIZE,Math.random() * CANVAS_SIZE,ctx, CANVAS_SIZE))
  }
  draw()
}
document.addEventListener("DOMContentLoaded", setup)

let draw = () => {
  ctx.save()
  ctx.fillStyle ='rgba(30,30,30,0.4)'
  ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.fill()
  ctx.restore()

  for (var i = FORCE_ARRAY.length - 1; i > 0; i--) {
   // FORCE_ARRAY[i].draw()
  }
  for (var i = PARTICLES_ARRAY.length - 1; i >= 0; i--) {
    var p = PARTICLES_ARRAY[i]
    p.edges() 
    p.compute(FORCE_ARRAY)
    p.draw()
    p.update()

  } 
	window.requestAnimationFrame(draw)
}