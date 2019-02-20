import { noise } from '@/lib/noise.js'
import Gcode from './gcode.js'

let size = {
	width: 0,
	height: 0
}
var paths = [
	'M 100 100 L 300 80 l-100,100h200v-40 M 100 10 C 50 20, 20 50, 10 100 C 20 50, 150 20, 100 10 S 150 150, 180 80 S 250 100, 80 30v12'
]
let parser =  new Gcode()
let setup = () => {
	let downloadButton = document.querySelector('#download-button')
	downloadButton.addEventListener('click', parse)
	let container = document.querySelector('#canvas-container')
	var ns = 'http://www.w3.org/2000/svg'
	let frame = document.createElementNS(ns, 'svg')
	var render = document.querySelector('#canvas-el')
	render.width = 1000
	render.height = 600
	size.width = window.innerWidth 
	size.height = window.innerHeight * 0.6
	frame.setAttributeNS(null, 'width', size.width)
	frame.setAttributeNS(null, 'height', size.height)
	frame.id= "svg-render"
	for (var i = paths.length - 1; i >= 0; i--) {
		let p = document.createElementNS(ns, 'path')
		p.setAttributeNS(null, 'd', paths[0])
		p.setAttributeNS(null, 'fill', 'none')
		p.setAttributeNS(null, 'stroke', 'black')
		frame.append(p)
	}
	container.append(frame)
	//draw()

	//loadSvg()
	
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
	
	let render = document.querySelector('#canvas-el')
  	let ctx = render.getContext('2d')
  	ctx.beginPath();
	ctx.moveTo(10.2, 10.2);
	ctx.strokeStyle = "#FF0000";
	for (var i =  0 ; i < parsed.length; i++) {
		for (var j =  0 ; j < parsed[i].length; j++) {
			let p = parsed[i]
			if (p[j].type == 'M'){
				ctx.moveTo(p[j].x, p[j].y)
			} else {
				ctx.lineTo(p[j].x, p[j].y)
				ctx.stroke();
			}
		}

	}
}
let loadSvg = () => {
	let medal = document.getElementById('medal')
	medal.addEventListener("load", function () {
		var svgDoc = medal.contentDocument;
		// Get one of the SVG items by ID;
		var pathsBuffer = svgDoc.getElementsByTagName("path")
		for (var i = pathsBuffer.length - 1; i >= 0; i--) {
			var d = pathsBuffer[i].getAttribute('d')
			paths.push(d)
		}
	})
}
document.addEventListener("DOMContentLoaded", setup)

