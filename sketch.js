var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

var timeSinceLastBullet;
var asteroidsHit;

//////////////////////////////////////////////////
function setup() {
	createCanvas(1200, 800);
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	spaceship = new Spaceship();
	asteroids = new AsteroidSystem();

	//location and size of earth and its atmosphere
	atmosphereLoc = new createVector(width / 2, height * 2.9);
	atmosphereSize = new createVector(width * 3, width * 3);
	earthLoc = new createVector(width / 2, height * 3.1);
	earthSize = new createVector(width * 3, width * 3);

	// mode setting
	angleMode(DEGREES);

	timeSinceLastBullet = millis();
	asteroidsHit = 0;
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}

//////////////////////////////////////////////////
function draw() {
	background(0);
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	sky();

	// checks if user has fired the spaceship
	checkFire();
	
	spaceship.run();
	asteroids.run();

	drawEarth();
	drawAsteroidsHitText();

	checkCollisions(spaceship, asteroids); // function that checks collision between various elements
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}
//////////////////////////////////////////////////
function drawAsteroidsHitText() {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	push();
		textSize(50);
		textAlign(RIGHT);
		stroke("purple");
		strokeWeight(3);
		fill("red");

		text(asteroidsHit, 0.99 * width, 0.075 * height);
	pop();
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}
//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	noStroke();
	//draw atmosphere
	fill(0, 0, 255, 50);
	ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
	//draw earth
	fill(100, 255);
	ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}
//////////////////////////////////////////////////
function checkFire() {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (keyIsDown(32) && millis() - timeSinceLastBullet > 250) {
		spaceship.fire();
		timeSinceLastBullet = millis();
	}
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}
//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	for (let i = 0; i < asteroids.locations.length; i++) {
		//spaceship-2-asteroid collisions
		//YOUR CODE HERE (2-3 lines approx)
		if (isInside(spaceship.location, spaceship.size, 
			asteroids.locations[i], asteroids.diams[i])) {
				gameOver();
			}
		
		//asteroid-2-earth collisions
		//YOUR CODE HERE (2-3 lines approx)
		if (isInside(earthLoc, earthSize.y, 
			asteroids.locations[i], asteroids.diams[i])) {
				gameOver();
			}
	}

	//spaceship-2-earth
	//YOUR CODE HERE (1-2 lines approx)
	if (isInside(earthLoc, earthSize.y,
		spaceship.location, spaceship.size)) {
			gameOver();
		}

	//spaceship-2-atmosphere
	//YOUR CODE HERE (1-2 lines approx)
	if (isInside(atmosphereLoc, atmosphereSize.y,
		spaceship.location, spaceship.size)) {
			spaceship.setNearEarth();
		}

	//bullet collisions
	//YOUR CODE HERE (3-4 lines approx)
	for (let bullet of spaceship.bulletSys.bullets) {
		let bulletDiam = spaceship.bulletSys.diam;
		// check if it is hitting any asteroid
		for (let i = 0; i < asteroids.locations.length; i++) {
			if (isInside(asteroids.locations[i], asteroids.diams[i],
				bullet, bulletDiam)) {
					asteroids.destroy(i);
					asteroidsHit++;
				}
		}
	}
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (dist(locA.x, locA.y, locB.x, locB.y) < (sizeA/2 + sizeB/2)) {
		return true;
	}

	return false;
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}
//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
	// !!!!!!!!!!!!!!!!!! I wrote this code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	fill(255);
	textSize(80);
	textAlign(CENTER);
	text("GAME OVER", width / 2, height / 2)
	noLoop();
	// !!!!!!!!!!!!!!!! end of code I wrote !!!!!!!!!!!!!!!!!!!!!!!!!!
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
	push();
	while (starLocs.length < 300) {
		starLocs.push(new createVector(random(width), random(height)));
	}
	fill(255);
	for (var i = 0; i < starLocs.length; i++) {
		rect(starLocs[i].x, starLocs[i].y, 2, 2);
	}

	if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
	pop();
}

// FURTHER DEVELOPMENT
// 1. A red arc is added to let the user know which direction is the spaceship being pushed in by
// their inputs

// 2. Spacebar can now be held to fire bullets

// 3. Score on right top to keep track of how many asteroids were hit

// 4. Changed the look and feel of the game