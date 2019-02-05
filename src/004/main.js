import { noise } from '@/lib/noise.js'
import Gcode from './gcode.js'

let size = {
	width: 0,
	height: 0
}
const paths = [
	'M 100 100 L 300 100 L 200 300 C 120 20, 180 20, 170 10'
]
let parser =  new Gcode()
let setup = () => {
	let downloadButton = document.querySelector('#download-button')
	downloadButton.addEventListener('click', parse)
	let container = document.querySelector('#canvas-container')
	var ns = 'http://www.w3.org/2000/svg'
	let frame = document.createElementNS(ns, 'svg')
	size.width = window.innerWidth 
	size.height = window.innerHeight * 0.6
	frame.setAttributeNS(null, 'width', size.width)
	frame.setAttributeNS(null, 'height', size.height)
	frame.id= "svg-render"
	for (var i = paths.length - 1; i >= 0; i--) {
		let p = document.createElementNS(ns, 'path')
		p.setAttributeNS(null, 'd', paths[i])
		p.setAttributeNS(null, 'fill', 'none')
		p.setAttributeNS(null, 'stroke', 'black')
		frame.append(p)
	}
	container.append(frame)
	//draw()
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

let parse = () => {
	let parsed = []
	for (var i = paths.length - 1; i >= 0; i--) {
		parsed.push(parser.parseSVG(paths[i]))
	}
	
	console.log(parsed)
}
document.addEventListener("DOMContentLoaded", setup)
