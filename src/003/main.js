import { noise } from '@/lib/noise.js'
import House from './house.js'
import Spiral from './spiral.js'
let size = {
	width: 0,
	height: 0
}
const SPIRAL_COUNT = 30
var spiralManager = []
var activeRenderer = true
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
}
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
}
let setup = () => {
	let downloadButton = document.querySelector('#download-button')
	downloadButton.addEventListener('click', download)
	let container = document.querySelector('#canvas-container')
	var ns = 'http://www.w3.org/2000/svg'
	let frame = document.createElementNS(ns, 'svg')
	size.width = window.innerWidth 
	size.height = window.innerHeight * 0.6
	frame.setAttributeNS(null, 'width', size.width)
	frame.setAttributeNS(null, 'height', size.height)
	for (var i =  SPIRAL_COUNT; i >= 0; i-= 1) {
		var tmp = new Spiral(size.width / 2, size.height / 2, frame, Math.random() * 360, Math.random() *360 , size) 
		tmp.create()
		spiralManager.push(tmp)
	}
	frame.id= "svg-render"
	container.append(frame)
	draw()
}
let draw = () => {
	for (var i = spiralManager.length - 1; i >= 0; i--) {
		spiralManager[i].update()
	}
	if (activeRenderer) window.requestAnimationFrame(draw)
}

let download = () => {
	activeRenderer = false;
	var gcode = ''
	for (var i = spiralManager.length - 1; i >= 0; i--) {
		 gcode += spiralManager[i].toGcode()
	}
	let render = document.querySelector('#canvas-container')
	let link = document.createElement('a')
	link.download = 'spiral.gcode'
	link.href = 'data:text/plain,' + gcode 
	link.click()
}

document.addEventListener("DOMContentLoaded", setup)

