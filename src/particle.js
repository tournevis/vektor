import vektor from './index.js'
import {dist} from './utils.js'
export default class particle {
	constructor(ctx) {
		this.position = this.createVector();
	    //this.velocity = p5.Vector.random2D();
	    this.ctx = ctx;
	    this.acceleration = this.createVector();
	    this.maxForce = 2;
	    this.maxSpeed = 4;
	    this.radius = Math.random() * 6
	    this.acceleration = new vektor(0, 0)
	    this.velocity = new vektor(Math.random() * 5, Math.random() * 10)
	}
	createVector (x, y) {
		return new vektor(x || Math.random() * 400, y ||  Math.random() * 400)
	}
	draw () {
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
	limit() {

	}
	align(particles) {
	    let perceptionRadius = 1;
	    let steering = this.createVector(0, 0);
	    let total = 0;
	    for (let other of particles) {
	      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
	      if (other != this && d < perceptionRadius && d != 'undefined') {	
	        steering.add(other.velocity);
	        total++;
	      }
	    }
	    if (total > 0) {
	      steering.div(total);
	      steering.hypot(this.maxSpeed);
	      steering.sub(this.velocity);
	      steering.limit(this.maxForce);
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

    	//this.acceleration.add(alignment)
	}
	update () {
		this.position.add(this.velocity)
		this.velocity.add(this.acceleration)
		this.velocity.limit(this.maxSpeed)
		this.acceleration.mult(0);
	}
}