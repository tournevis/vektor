import { Vektor, dist } from './lib/index.js'

export default class particle {
	constructor(ctx) {
		this.position = this.createVector();
	    //this.velocity = p5.Vector.random2D();
	    this.ctx = ctx;
	    this.acceleration = new Vektor(0, 0)
	    this.maxForce = 1;
	    this.maxSpeed = 4;
	    this.radius = Math.random() * 6
	    this.acceleration = new Vektor(0, 0)
	    this.velocity = new Vektor(Math.random() * 10 -5, Math.random() * 10 - 5)
	    this.velocity.scaleMag(Math.random() + 0.5)
	}
	createVector (x, y) {
		return new Vektor(x || Math.random() * 400, y ||  Math.random() * 400)
	}
	draw () {
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
	align(particles) {
	    let perceptionRadius = 80;
	    let steering = new Vektor(0, 0)
	    let total = 0;
	    for (let other of particles) {
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
	    for (let other of particles) {
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
	    for (let other of particles) {
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
	    if (this.position.x > 400) {
	      this.position.x = 0;
	    } else if (this.position.x < 0) {
	      this.position.x = 400;
	    }
	    if (this.position.y > 400) {
	      this.position.y = 0;
	    } else if (this.position.y < 0) {
	      this.position.y = 400;
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
		this.acceleration.mult(0);
	}
}