class Spaceship {
	constructor() {
		this.velocity = new createVector(0, 0);
		this.location = new createVector(width / 2, height / 2);
		this.acceleration = new createVector(0, 0);
		this.maxVelocity = 5;
		this.bulletSys = new BulletSystem();
		this.size = 50;

		// user force
		this.userForce = new createVector(0, -0.1);
	}

	run() {
		this.bulletSys.run();
		this.draw();
		this.move();
		this.edges();
		this.interaction();
	}

	draw() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		let offSet = this.userForce.copy();
		let offsetAngle = degrees(offSet.heading());

		// TRIANGLE REPRESENTATION
		push();
			translate(this.location.x, this.location.y);
			fill("yellow");
			// rotate(offsetAngle + 90);
			triangle(-this.size / 2, this.size / 2,
				this.size / 2,this.size / 2,
				0, -this.size / 2);
		pop();

		// draw heat curve
		push();
			stroke(255, 0, 0, 100);
			strokeWeight(6);
			noFill();

			arc(this.location.x, this.location.y, 
				this.size + 25, this.size + 25, offsetAngle - 30, offsetAngle + 30);
		pop();
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	move() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVelocity);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	applyForce(f) {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.acceleration.add(f);
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	interaction() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (keyIsDown(LEFT_ARROW)) {
			this.applyForce(createVector(-0.1, 0));
			this.userForce.add(createVector(-0.1, 0));
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.applyForce(createVector(0.1, 0));
			this.userForce.add(createVector(0.1, 0));
		}
		if (keyIsDown(UP_ARROW)) {
			this.applyForce(createVector(0, -0.1));
			this.userForce.add(createVector(0, -0.1));
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.applyForce(createVector(0, 0.1));
			this.userForce.add(createVector(0, 0.1));
		}
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	fire() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// calculate bullet vel
		let bulletVel = this.userForce.copy();
		bulletVel.normalize();
		bulletVel.mult(5);

		this.bulletSys.fire(this.location.x, this.location.y, bulletVel);
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	edges() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (this.location.x < 0) this.location.x = width;
		else if (this.location.x > width) this.location.x = 0;
		else if (this.location.y < 0) this.location.y = height;
		else if (this.location.y > height) this.location.y = 0;
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	setNearEarth() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		let gravity = new createVector(0, 0.05);
		
		let friction = this.velocity.copy();
		friction.mult(-1);
		friction.div(30);

		this.applyForce(gravity);
		this.applyForce(friction);
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}
}
