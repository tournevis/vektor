export default class wall{
	constructor(x, y, width = 90, height = 40) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
	draw () {
		let path = document.createElement('path')
		path.d = 'M10 80 Q 95 10 180 80'
		path.stroke = 'black'
	}
}