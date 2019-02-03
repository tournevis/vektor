import { noise } from '@/lib/noise.js'
import svg from 'svg.js'

var CANVAS_SIZE = 450
let TWO_PI = 2 * Math.PI;
var SVG = {}
var circles = []
var int = 0
var seed = Math.random()
SVG = svg('canvas-container').size(CANVAS_SIZE, CANVAS_SIZE)

let setup = () => {
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      var r = noise.perlin3(x /10  , y /10, seed)
      var width = 3 +  40 * Math.abs(r)
      //rect.radius(Math.abs(rad))
      var rect = SVG.rect(width, width)
      rect.move(x * 40 + 40, y * 40 + 40)
      rect.transform({ rotation: 45})
      int +=  1
    }
  }
  
  draw()
}


let draw = () => {
  seed += 0.01
	window.requestAnimationFrame(draw)
}

document.addEventListener("DOMContentLoaded", setup)