import { Vektor, dist, random } from './lib/index.js'

export default class particle {
	constructor(x, y, ctx, edge) {
			this.position =  new Vektor(x, y);
	    this.lastPosLength = 4
	    this.lastPos = []	
	    this.ctx = ctx;
	    this.edge = edge
	    this.acceleration = new Vektor(0, 0)
	    this.maxForce = 1;
	    this.maxSpeed = 4;
	    this.colorIndex = ['780116','db7c26','f3d34a','d8572a','c32f27']
	    this.color = this.colorIndex[random(this.colorIndex.length)]
	    this.radius = Math.random() * 6
	    this.acceleration = new Vektor(0, 0)
	    this.velocity = new Vektor(Math.random() * 10 -5, Math.random() * 10 - 5)
	    this.velocity.scaleMag(Math.random() + 0.5)
	}
	createVector (x, y) {
		return new Vektor(x || Math.random() * this.edge, y ||  Math.random() * this.edge)
	}
	draw () {
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
		this.ctx.restore() *

		this.ctx.save()
		this.ctx.fillStyle = '#FFFFFF'

		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.restore()
	}
	align(particles) {
	    let perceptionRadius = 80;
	    let steering = new Vektor(0, 0)
	    let total = 0;
	    for (let others of particles) {
				let other = others.ref
				let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
				if (other != this && d < perceptionRadius) {
					steering.add(other.velocity);
					total++;
				}
	    }
	    if (total > 0) {
		    steering.div(total);
		    steering.scaleMag(this.maxSpeed);
		    steering.sub(this.velocity);
		    steering.limit(this.maxForce);
	    }
	    return steering;
	}
	cohesion(particles) {
	    let perceptionRadius = 100;
	    let steering = new Vektor(0, 0)
	    let total = 0;
	    for (let others of particles) {
				let other = others.ref
				let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
				if (other != this && d < perceptionRadius) {
					steering.add(other.position);
					total++;
				}
	    }
	    if (total > 0) {
		    steering.div(total);
		    steering.sub(this.position);
		  	steering.scaleMag(this.maxSpeed);
		  	steering.sub(this.velocity);
		    steering.limit(this.maxForce);
	    }
	    return steering;
	}
	separation(particles) {
	    let perceptionRadius = 50;
	    let steering = new Vektor(0, 0)
	    let total = 0;
	    for (let others of particles) {
			let other = others.ref
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other != this && d < perceptionRadius) {
				let diff = new Vektor(this.position.x, this.position.y)
				diff.sub(other.position.x, other.position.y)
				diff.div(d * d)
				steering.add(diff)
				total++;
			}
	    }
	    if (total > 0) {
		    steering.div(total);
		  	steering.scaleMag(this.maxSpeed);
		  	steering.sub(this.velocity);
		    steering.limit(this.maxForce * 1.1);
	    }
	    return steering;
	}
	edges() {
	    if (this.position.x > this.edge) {
	      this.position.x = 0;
	      this.lastPos= []
	    } else if (this.position.x < 0) {
	      this.position.x = this.edge;
	      this.lastPos= []
	    }
	    if (this.position.y > this.edge) {
	      this.position.y = 0;
	      this.lastPos= []
	    } else if (this.position.y < 0) {
	      this.position.y = this.edge;
	      this.lastPos= []
	    }
	}
	compute (paricules) {
    	let alignment = this.align(paricules)
    	let cohesion = this.cohesion(paricules)
    	let separation = this.separation(paricules)
    	this.acceleration.add(alignment)
    	this.acceleration.add(cohesion)
    	this.acceleration.add(separation)
	}
	update () {
		this.velocity.add(this.acceleration)
		this.velocity.limit(this.maxSpeed)
		this.position.add(this.velocity)
		this.lastPos.unshift(new Vektor(this.position))
		this.lastPos.length > this.lastPosLength && this.lastPos.pop()
		this.acceleration.mult(0);
	}
}
