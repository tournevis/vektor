export default class gcode{
	constructor() {
		this.path = 'M 100 100 L 300 100 l 200,300h200v-40'
		this.coords = []
		this.commands = []
		this.lastCoord = {}
		this.regex = /([a-zA-Z])+\s?((?:[0-9-+.,]+\s?)*)/g
	}
	parseSVG (path) {
		this.coords = []
		this.commands = []
		this.path = path
		this.execRegex()
		return this.coords
	}

	parseAndRound(value) {
		if (typeof value === 'number') return value
		let f = parseFloat(value)
		return Number(Math.round((f / 2 )+'e'+3)+'e-'+3)
	}

	execRegex() {
		let result
		let prev
		while (( result = this.regex.exec(this.path)) !== null) {
			let type = result[1]
			let coord = result[2]
			let endline = result[3]
			switch (type.toUpperCase()) {
				case 'M':
					coord = coord.trim().split(/[\s,]+/)
					type === type.toUpperCase()
						? this.moveTo(type, coord)
						: this.moveFromTo(type, coord)
					break;
				case 'L':
					coord = coord.trim().split(/[\s,]+/)
					type === type.toUpperCase()
						? this.moveTo(type, coord)
						: this.moveFromTo(type, coord)
					break;
				case 'H':
					coord = coord.trim().split(/[\s,]+/)
					coord.push(type === type.toUpperCase()
							? this.coords[this.coords.length - 1].x
							: '0'
						)
					type === type.toUpperCase()
						? this.moveTo(type, coord)
						: this.moveFromTo(type, coord)
					break;
				case 'V':
					coord = coord.trim().split(/[\s,]+/)
					coord.unshift(
						type === type.toUpperCase()
							? this.coords[this.coords.length - 1].y
							: '0'
						)
					
					type === type.toUpperCase()
						? this.moveTo(type, coord)
						: this.moveFromTo(type, coord)
					break;
				case 'C':
					coord = coord.split(/[\s,]+/)
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
		return this.coords//this.pathElements.join(this.endLine())
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
	moveTo (type, coord) {
		var mapCoord = {x: coord[0], y: coord[1]}
		let isUpperCase = type === type.toUpperCase()
		let lastCoord = this.coords[this.coords.length - 1]
		var obj = {
			type: type,
			position: isUpperCase ? 'absolute': 'relative',
			x: this.parseAndRound(mapCoord.x),
			y: this.parseAndRound(mapCoord.y)
		}
		this.coords.push(obj)
	}
	moveFromTo(type, coord) {
		var mapCoord = {x: coord[0], y: coord[1]}
		let isUpperCase = type === type.toUpperCase()
		let lastCoord = this.coords[this.coords.length - 1]
		var obj = {
			type: type,
			position: isUpperCase ? 'absolute': 'relative',
			x: lastCoord.x + this.parseAndRound(mapCoord.x),
			y: lastCoord.y + this.parseAndRound(mapCoord.y)
		}
		this.coords.push(obj)
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

	map () {

	}
	default () {

	}
	backToZero() {
		this.commands.push(this.penUp())
		this.commands.push('X0 Y0')
	}
}