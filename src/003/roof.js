export default class Roof {
	constructor(x, y, width = 90, height = 40) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.ns =  'http://www.w3.org/2000/svg'
	}
	draw () {
		let path = document.createElementNS(this.ns, 'path')
		path.setAttributeNS(null, 'd', 'M10 10 Q 95 10 180 80') 
		path.setAttributeNS(null, 'stroke', 'black')
		path.setAttributeNS(null, 'fill', 'none')
		path.id ="roof" + '01' 
		return path
	}
}