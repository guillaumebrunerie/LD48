conf = {};

// The start screen
conf.startButtonY = 1600;

// The inventory
conf.inventoryX = 150;
conf.inventoryY = 80;
conf.screwX = -64;
conf.screwY = 1;
conf.screwdX = 62;

// The buttons
conf.uiY = 1700;
conf.uiLeftX = 0;
conf.uiLeftY = -180;
conf.uiRightX = 0;
conf.uiRightY = 180;
conf.uiYSwitch = 300;

// The astronaut
conf.lineY = 120;
conf.astronautY = 240;

// The robot
conf.robotSpeed = 2;
conf.angleMax = 0.3;
conf.robotY = 540;
conf.robotRadius = 1000;
conf.handY = 40;
conf.eyesY = -8;
conf.bodyY = 20;
conf.headY = -30;
conf.headOriginY = 50;

// Shooting beam
conf.beamAngle = 0.3;
conf.beamSpeed = 3.5;
conf.shootingRangeY = 0;
conf.shootingRangeAdjustment = 1500;

// Bullets
conf.bulletSpeed = 2;
conf.reloadDelay = 0;
conf.bulletScale = 1.4;
conf.bulletOriginY = 0.9;

// Laser
conf.laserY = -65;

// Hand
conf.handSpeed = 1;
conf.handPullbackSpeed = 0.9;
conf.fastHand = 5;

conf.levels = {};

let asteroid1 = {name: "Asteroid_01", scale: {min: 0.5, max: 1}};
let asteroid2 = {name: "Asteroid_02", scale: {min: 0.8, max: 1.4}};
let asteroid3 = {name: "Asteroid_03", scale: {min: 0.8, max: 1.4}};
let smallasteroid1 = {name: "Small_Asteroid_01", scale: {min: 0.8, max: 1.4}};
let smallasteroid2 = {name: "Small_Asteroid_02", scale: {min: 0.8, max: 1.4}};
let tire = {name: "Tire", scale: {min: 0.8, max: 1.1}};
let tv = {name: "ObstacleTV", scale: {min: 0.5, max: 0.8}, anim: true};
let screw = {name: "Screw", speedX: {min: -0.05, max: 0.05}, speedY: {min: -0.05, max: -0.2}, speedR: {min: -0.001, max: 0.001}, scale: 1, anim: true};

conf.obstacleDefault = {
	speedX: {min: -0.1, max: 0.1},
	speedY: {min: -0.1, max: -0.25},
	speedR: {min: -0.001, max: 0.001},
	scale: 1,
};

conf.powerUpDefault = {
	speedX: {min: -0.05, max: 0.05},
	speedY: {min: -0.05, max: -0.2},
	speedR: {min: -0.001, max: 0.001},
	scale: 1,
};

conf.levels["asteroids"] = {
	// Obstacles
	obstacleCreationRate: {min: 2, max: 3},
	obstacles: [asteroid1, asteroid2, asteroid3],
	obstacleDefault: conf.obstacleDefault,

	// Powerups
	powerUpCreationRate: {min: 3, max: 5},
	powerUps: [{name: "Shield"}],
	powerUpDefault: conf.powerUpDefault,

	// Screws
	screwCreationRate: {min: 10, max: 15},
	screws: [screw],
};

conf.levels["varied"] = {
	obstacleCreationRate: {min: 2, max: 3},
	obstacles: [asteroid1, asteroid2, smallasteroid1, tv, tv, tire, tire],
	obstacleDefault: conf.obstacleDefault,

	powerUpCreationRate: {min: 4, max: 5},
	powerUps: [{name: "Shield"}, {name: "Laser"}, {name: "Magnet"}],
	powerUpDefault: conf.powerUpDefault,

	screwCreationRate: {min: 20, max: 30},
	screws: [screw],
};

conf.levels["small"] = {
	obstacleCreationRate: {min: 0.5, max: 2},
	obstacles: [asteroid1, asteroid2, asteroid3, smallasteroid1, smallasteroid2, tv, tv, tire, tire],
	obstacleDefault: conf.obstacleDefault,

	powerUpCreationRate: {min: 2, max: 3},
	powerUps: [{name: "Shield"}, {name: "Laser"}, {name: "Laser"}, {name: "Magnet"}],
	powerUpDefault: conf.powerUpDefault,

	screwCreationRate: {min: 30, max: 45},
	screws: [screw],
};

// function dup(level) {
// 	return JSON.parse(JSON.stringify(level));
// }

// conf.levels["screws"] = dup(conf.levels["default"]);
// conf.levels["screws"].screwCreationRate = {min: 1, max: 2};

// conf.levels["powerUps"] = dup(conf.levels["default"]);
// conf.levels["powerUps"].powerUpCreationRate = {min: 1, max: 2};

conf.levelNames = {
	1: "asteroids",
	2: "varied",
	3: "small"
};

//// Apply the default values

function defaultize(array, def) {
	array.forEach(x => {
		Object.keys(def).forEach(key => {
			if (! (key in x))
				x[key] = def[key];
		});
	});
}

conf.allObstacles = [];
conf.allPowerUps = [];

for (let key in conf.levels) {
	let level = conf.levels[key];
	defaultize(level.obstacles, level.obstacleDefault);
	defaultize(level.powerUps, level.powerUpDefault);
	level.obstacles.forEach(o => {
		if (!conf.allObstacles.includes(o.name) && !o.anim)
			conf.allObstacles.push(o.name);
	});
	level.powerUps.forEach(o => {
		if (!conf.allPowerUps.includes(o.name))
			conf.allPowerUps.push(o.name);
	});
};
