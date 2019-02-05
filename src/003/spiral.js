export default class spiral{
	constructor(x, y, svg, angle = 0, grow , size) {
		this.x = x
		this.y = y
		this.strokeWidth = 0.2
		this.radius = Math.random() * 10 + 40
		this.angle = angle
		this.grow = grow 
		this.raduisGrowth = 120
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
		this.path.setAttributeNS(null, 'stroke', 'black')
		this.path.setAttributeNS(null, 'stroke-width', this.strokeWidth + 'px')
		this.path.setAttributeNS(null, 'fill', 'none')
		this.pathString =  this.pathArray.join()
		this.path.setAttributeNS(null, 'd', this.pathString )

		this.svg.append(this.path)
		return this.path
	}
	getRadius (grow = 0) {
		return Math.exp(grow/this.raduisGrowth) + this.radius
	}
	update () {
		this.grow += this.speed 
		this.pathArray.push(`L ${this.size.width/2 + Math.cos(this.radians(this.grow + this.angle)) * this.getRadius(this.grow)} ${this.size.height / 2 + Math.sin(this.radians(this.grow + this.angle)) * this.getRadius(this.grow)}`)
		this.pathString = this.pathArray.join()
		this.path.setAttributeNS(null, 'd', this.pathString	) 
	}
	closePath () {
		this.pathArray.push(' z')
	}
	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}
	radians (degrees) {
 		return degrees * Math.PI / 180
	}
	toGcode () {
		var scaleFactor = 2
		var str = 'G01 '
		var firstStep = this.pathArray[0].substr(1)
		var ar = firstStep.split(' ')
		str += 'X' + this.parseAndRound(ar[1]) + ' Y' + this.parseAndRound(ar[2]) + '\n'
		str += 'S1000 M3 \n'
		for (var i = 1; i < this.pathArray.length - 1; i++) {
			var tmpAr = this.pathArray[i].substr(1).split(' ')
			str +=  'X' + this.parseAndRound(tmpAr[1]) + ' Y' + this.parseAndRound(tmpAr[2]) + '\n'
		}
		str += 'S0 M5 \n'
		return str
	}
	parseAndRound(value) {
	 let f = parseFloat(value)
	 return Number(Math.round((f / 2 )+'e'+3)+'e-'+3)
	}
	degrees (radians) {
		return radians * 180 / Math.PI
	}
}