class BulletSystem {
	constructor() {
		this.bullets = [];
		this.velocity = new createVector(0, -10);
		// this.velocities = [];
		this.diam = 10;
	}

	run() {
		this.move();
		this.draw();
		this.edges();
	}
	fire(x, y, vel=this.velocity) {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.bullets.push(createVector(x, y));
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	//draws all bullets
	draw() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		fill(255);
		for (var i = 0; i < this.bullets.length; i++) {
			ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
		}
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	//updates the location of all bullets
	move() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		for (var i = 0; i < this.bullets.length; i++) {
			// this.bullets[i].x += this.velocities[i].x;
			// this.bullets[i].y += this.velocities[i].y;
			this.bullets[i].y += this.velocity.y;
		}
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}

	//check if bullets leave the screen and remove them from the array
	edges() {
		// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		let bulletsCopy = Object.assign([], this.bullets);

		for (let bullet of this.bullets) {
			if (bullet.x < 0 || bullet.x > width ||
				bullet.y < 0 || bullet.y > height) {
					// remove bullet from array
					let indexOfBullet = this.bullets.indexOf(bullet);

					this.bullets.splice(indexOfBullet, 1);
					// this.velocities.splice(indexOfBullet, 1);
				}
		}
		// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
	}
}
