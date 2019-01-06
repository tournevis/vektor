import { Vektor, dist, random, Quadtree } from './lib/index.js'
import { Point, Rect,  Circle } from './lib/geometry.js'

import Particle from './particle.js'
let ctx , canvas, qTree, lastCalledTime
let PARTICLES_ARRAY = []
let  mousePos = new Point(0,0)
let PARTICLE_NUM = 30
const CANVAS_SIZE = 400
let rangeQuery = 80
let forceSliders = [1,1,1];
let forceCheckboxes = [true, true, true]
let setup = () => {
 	canvas = document.createElement('canvas')
 	canvas.height = CANVAS_SIZE
 	canvas.width = CANVAS_SIZE
 	let container = document.querySelector('#canvas-container')
  setupUi()
 	container.append(canvas)
  canvas.addEventListener('mousemove', function (ev) {
    let rect = canvas.getBoundingClientRect()
    mousePos.x = ev.clientX - rect.left,
    mousePos.y = ev.clientY - rect.top
  })
 	ctx = canvas.getContext('2d')
  for (var i = 0; i <= PARTICLE_NUM; i++) {
  	PARTICLES_ARRAY.push(new Particle(Math.random() * CANVAS_SIZE,Math.random() * CANVAS_SIZE,ctx, CANVAS_SIZE))
  }
  draw()
  /*
  let boundary = new Rect(10,10, 380, 380)
  qTree = new Quadtree(boundary, 8 )
  for (var i = 0; i < 190; i++) {
    let p = new Point(random(CANVAS_SIZE), random(CANVAS_SIZE))
    qTree.insert(p)
  }
  rangeDraw()*/
}

document.addEventListener("DOMContentLoaded", setup)
let setupUi = () => {
  let queryVal = document.querySelector('#rangeQuerySlide')
  queryVal.oninput = function () {
    rangeQuery = parseInt(this.value)
    updateText('#rangeQueryDisplay',rangeQuery)
  }
  let particleNb = document.querySelector('#particleSlide')

  particleNb.oninput = function () {
    PARTICLE_NUM = parseInt(this.value)
    updateText('#particleNumDisplay',PARTICLE_NUM)
    PARTICLES_ARRAY = []
    for (var i = 0; i <= PARTICLE_NUM; i++) {
      PARTICLES_ARRAY.push(new Particle(Math.random() * CANVAS_SIZE,Math.random() * CANVAS_SIZE,ctx, CANVAS_SIZE))
    }
  }
  let sliders = document.querySelectorAll('.slide')
  sliders.forEach((slider, index) => {
    slider.oninput = function() {
      forceSliders[index] = parseInt(this.value)
    }
  })
  let checkboxes = document.querySelectorAll('.active-force')
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", function() {
      forceCheckboxes[index] = this.checked
    })
  })
  updateText('#rangeQueryDisplay',rangeQuery)
  updateText('#particleNumDisplay',PARTICLE_NUM)
}

let updateText = (identifier, content) => {
  var el = document.querySelector(identifier)
  if (el) el.innerHTML = content
}
let rangeDraw = () => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
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
  ctx.save()
  ctx.fillStyle ='rgba(30,30,30,0.4)'
  ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.fill()
  ctx.restore()

  let boundary = new Rect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  qTree = new Quadtree(boundary, 8)
  for (var i = PARTICLES_ARRAY.length - 1; i > 0; i--) {
    let p = PARTICLES_ARRAY[i]
    let point = new Point(p.position.x, p.position.y, p)
		p.edges()
		p.update()
    qTree.insert(point)
		p.draw()
  }

	for (var i = PARTICLES_ARRAY.length - 1; i >= 0; i--) {
    let p = PARTICLES_ARRAY[i]
    var range = new Circle(p.position.x, p.position.y, rangeQuery)
    var other = qTree.query(range)
		p.compute(other)
	}
  //qTree.show(ctx)
	window.requestAnimationFrame(draw)
}
export {forceSliders, forceCheckboxes}