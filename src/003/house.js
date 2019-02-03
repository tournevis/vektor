import Wall from './wall.js'
import Roof from './roof.js'
export default class house{
	constructor(x, y, width = 90, height = 40) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.wall = new Wall(x, y, width, height)
		this.roof = new Roof(x, y, width, height)
		this.ns =  'http://www.w3.org/2000/svg'
	}
	draw () {
		let path = document.createElementNS(this.ns, 'g')
		//path.append(this.wall.draw())
		path.append(this.roof.draw())
		//path.append(this.faces.draw())
		return path
	}
}