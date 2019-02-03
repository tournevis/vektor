export default class spiral{
	constructor(x, y, svg, angle = 0, grow , size) {
		this.x = x
		this.y = y
		this.radius = 50
		this.angle = angle
		this.grow = grow 
		this.speed = Math.random() * 0.4
		this.size = size
		this.id = "spiral-" + this.getRandomInt(10000)
 		this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		this.svg = svg
		this.pathString = `M ${size.width/2 + Math.cos(this.radians(this.angle)) * this.getRadius()} ${ size.height / 2 + Math.sin(this.radians(this.angle)) * this.getRadius()}`
		this.ns = 'http://www.w3.org/2000/svg'
		this.pathArray = []
		this.pathArray.push(this.pathString)
	}
	create () {
		for (var i = 0; i < this.grow; i+= 8 ) {
			this.pathArray.push(`L ${this.size.width/2 + Math.cos(this.radians(i + this.angle)) * this.getRadius(i)} ${this.size.height / 2 + Math.sin(this.radians(i + this.angle)) * this.getRadius(i)}`)
		}
		this.path.setAttributeNS(null, 'd', this.pathArray.join()) 
		this.path.setAttributeNS(null, 'stroke', 'black')
		this.path.setAttributeNS(null, 'stroke-width', '1px')
		this.path.setAttributeNS(null, 'fill', 'none')

		this.svg.append(this.path)
		return this.path
	}
	getRadius (grow = 0) {
		return Math.exp(grow/120) + this.radius
	}
	update () {
		this.grow += this.speed 
		this.pathArray.push(`L ${this.size.width/2 + Math.cos(this.radians(this.grow + this.angle)) * this.getRadius(this.grow)} ${this.size.height / 2 + Math.sin(this.radians(this.grow + this.angle)) * this.getRadius(this.grow)}`)
		this.path.setAttributeNS(null, 'd', this.pathArray.join()) 
	}
	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}
	radians (degrees) {
 		return degrees * Math.PI / 180
	}
	degrees (radians) {
		return radians * 180 / Math.PI
	}
}