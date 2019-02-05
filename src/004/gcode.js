export default class gcode{
	constructor() {
		this.path = ''
		this.pathElements = []
		this.lastCoord = {}
		this.regex = /([a-zA-Z])?\s((?:[0-9-+,]+\s?)*)/g
	}
	parseSVG (path) {
		this.pathElements = []
		this.path = path
		this.execRegex()
	}
	execRegex() {
		let result
		let prev
		while (( result = this.regex.exec(this.path)) !== null) {
			let type = result[1]
			let coord = result[2]
			let endline = result[3]
			switch (type) {
				case 'M':
					coord = coord.split(' ')
					var mapCoord = {x: coord[0], y: coord[1]}
					this.moveTo(prev, mapCoord)
					break;
				case 'L': 
					coord = coord.split(' ')
					var mapCoord = {x: coord[0], y: coord[1]}
					this.lineTo(prev, mapCoord)
					break;
				case 'C':
					coord = coord.split(',')
					var mapCoord = coord.map(el => {
						var tmp = el.trim().split(' ')
						return {
							x: tmp[0],
							y: tmp[1]
						}
					})
					mapCoord.unshift(this.lastCoord)
					this.cubicTo(prev, mapCoord)
					break;
			}
			prev = type
		}
		this.backToZero()
		return this.pathElements.join(this.endLine())
	}	
	penUp () {
		return 'S0 M5'
	}
	penDown () {
		return 'S1000 M3'
	}
	endLine () {
		return '\n'
	}
	moveTo (prev, coord) {
		if (prev !== 'M') {
			this.pathElements.push(this.penUp())
		}
		var line = `X${this.parseAndRound(coord.x)} Y${this.parseAndRound(coord.y)}`
		this.pathElements.push(line)
		this.lastCoord = coord
	}
	lineTo (prev, coord) {
		if (prev === 'M') {
			this.pathElements.push(this.penDown())
		}
		var line = `X${this.parseAndRound(coord.x)} Y${this.parseAndRound(coord.y)}`
		this.pathElements.push(line)
		this.lastCoord = coord
	}
	cubicTo (prev, coord) {	
		
		debugger
	}
	getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
		var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
		var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
		return ({
	        x: x,
	        y: y
	    });
	}
	CubicN(pct, a, b, c, d) {
	    var t2 = pct * pct;
	    var t3 = t2 * pct;
	    return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
	}

	parseAndRound(value) {
	 let f = parseFloat(value)
	 return Number(Math.round((f / 2 )+'e'+3)+'e-'+3)
	}

	map () {

	}
	default () {

	}
	backToZero() {
		this.pathElements.push(this.penUp())
		this.pathElements.push('X0 Y0')
	}
}