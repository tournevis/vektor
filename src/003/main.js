import { noise } from '@/lib/noise.js'
import House from './house.js'
import Spiral from './spiral.js'
let size = {
	width: 0,
	height: 0
}
var spiralManager = []
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
}
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
}
let setup = () => {
	let container = document.querySelector('#canvas-container')
	var ns = 'http://www.w3.org/2000/svg'
	let frame = document.createElementNS(ns, 'svg')
	size.width = window.innerWidth 
	size.height = window.innerHeight * 0.6
	frame.setAttributeNS(null, 'width', size.width)
	frame.setAttributeNS(null, 'height', size.height)
	for (var i = 20 - 1; i >= 0; i-= 1) {
		var tmp = new Spiral(size.width / 2, size.height / 2, frame, Math.random() * 360, Math.random() *180 , size) 
		tmp.create()
		spiralManager.push(tmp)
	}
	container.append(frame)
	draw()
}
let draw = () => {
	for (var i = spiralManager.length - 1; i >= 0; i--) {
		spiralManager[i].update()
	}
	window.requestAnimationFrame(draw)
}
document.addEventListener("DOMContentLoaded", setup)

