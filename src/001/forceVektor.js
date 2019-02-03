import { Vektor, dist, random } from '@/lib/index.js'
import { forceSliders, forceCheckboxes } from './main.js'
export default class forceVektor{
	constructor(x, y, ctx, force) {
		this.position =  new Vektor(x, y)
	    this.lastPosLength = 4
	    this.lastPos = []	
	    this.ctx = ctx;
	    this.force = force
	    this.colorIndex = ['780116','db7c26','f3d34a','d8572a','c32f27']
	    this.color = this.colorIndex[random(this.colorIndex.length)]
	    this.radius = Math.random() * 6
	    this.acceleration = new Vektor(0, 0)
	    this.velocity = new Vektor(Math.random() * 10 - 5, Math.random() * 10 - 5)
	    this.velocity.scaleMag(Math.random() + 0.5)
	}
	createVector (x, y) {
		return new Vektor(x || Math.random() * this.edge, y ||  Math.random() * this.edge)
	}
	draw () {
		/*
		this.ctx.save()
		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x, this.position.y);
		for (var i = 0 ; i < this.lastPos.length; i++) {
			this.ctx.lineTo(this.lastPos[i].x, this.lastPos[i].y)
		}
		this.ctx.lineWidth = 20;
		this.ctx.strokeStyle = "#" +this.color;
		this.ctx.lineCap = 'round';
		this.ctx.stroke()
		this.ctx.restore() */

		this.ctx.save()
		this.ctx.strokeStyle = '#FFFFFF'
		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x, this.position.y);
		this.ctx.lineTo(this.position.x + this.force.x, this.position.y + this.force.y)
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 2;
		this.ctx.stroke()
		this.ctx.restore()
	}
	update () {
	}
}
