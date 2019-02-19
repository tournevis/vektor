export default class gcode{
	constructor() {
		this.path = ''
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
					coord = coord.split(/[,]+/)
					var mapCoord = coord.map(el => {
						var tmp = el.trim().split(' ')
						return {
							x: tmp[0],
							y: tmp[1]
						}
					})
					this.cubicTo(type, mapCoord)
					break;
				case 'S':
					coord = coord.split(/[,]+/)
					// todo : Store last controle point and calc hi image through the last point.
					var mapCoord = coord.map(el => {
						var tmp = el.trim().split(' ')
						return {
							x: tmp[0],
							y: tmp[1]
						}
					})
					this.cubicTo(type, maxpCoord)
					break;
				case 'Z':
					this.backToZero()
					break;
			}
			prev = type
		}
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
		let lastCoord = this.getLastCoord()
		var obj = {
			type: type,
			position: isUpperCase ? 'absolute': 'relative',
			x: lastCoord.x + this.parseAndRound(mapCoord.x),
			y: lastCoord.y + this.parseAndRound(mapCoord.y)
		}
		this.coords.push(obj)
	}
	cubicTo (type, coord) {	
		var step = 3
		var lastCoord = this.getLastCoord()
		for (var i = 0; i <= 1; i += step / 100) {
			this.coords.push(this.getCubicBezierXYatPercent(lastCoord, coord[0], coord[1], coord[2] ,i))
		}
	}
	getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
		var x = this.CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
		var y = this.CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
		return ({
					type: 'C',
					position: 'relative',
	        x: x,
	        y: y
	    });
	}
	getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
    var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
    var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
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
	getLastCoord () {
		return this.coords[this.coords.length - 1]
	}
	backToZero() {
		this.commands.push(this.penUp())
		this.commands.push('X0 Y0')
	}
}