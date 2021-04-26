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

// Laser
conf.laserY = -65;

// Hand
conf.handSpeed = 1;
conf.handPullbackSpeed = 0.9;
conf.fastHand = 5;

conf.levels = {};

conf.levels["default"] = {
	// Obstacles
	obstacleCreationRate: {min: 1, max: 2},

	obstacles: [
		{name: "Asteroid_01", scale: {min: 0.5, max: 1}},
		{name: "Asteroid_02", scale: {min: 0.8, max: 1.4}},
		{name: "Asteroid_03", scale: {min: 0.8, max: 1.4}},
		{name: "Small_Asteroid_01", scale: {min: 0.8, max: 1.4}},
		{name: "Small_Asteroid_02", scale: {min: 0.8, max: 1.4}},
		{name: "Tire", scale: {min: 0.8, max: 1.1}}
	],

	obstacleDefault: {
		speedX: {min: -0.1, max: 0.1},
		speedY: {min: -0.1, max: -0.25},
		speedR: {min: -0.001, max: 0.001},
		scale: 1,
	},

	// Powerups
	powerUpCreationRate: {min: 2, max: 5},

	powerUps: [
		{name: "Laser"},
		{name: "Magnet"},
		{name: "Shield"},
		{name: "Target"}
	],

	powerUpDefault: {
		speedX: {min: -0.05, max: 0.05},
		speedY: {min: -0.05, max: -0.2},
		speedR: {min: -0.001, max: 0.001},
		scale: 1,
	},

	// Screws
	screwCreationRate: {min: 10, max: 5},

	screws: [
		{name: "Screw", speedX: {min: -0.05, max: 0.05}, speedY: {min: -0.05, max: -0.2}, speedR: {min: -0.001, max: 0.001}, scale: 1}
	],
};

function dup(level) {
	return JSON.parse(JSON.stringify(level));
}

conf.levels["screws"] = dup(conf.levels["default"]);
conf.levels["screws"].screwCreationRate = {min: 1, max: 2};

conf.levels["powerUps"] = dup(conf.levels["default"]);
conf.levels["powerUps"].powerUpCreationRate = {min: 1, max: 2};

conf.levelNames = {
	1: "screws",
	2: "powerUps",
	3: "default"
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
		if (!conf.allObstacles.includes(o.name))
			conf.allObstacles.push(o.name);
	});
	level.powerUps.forEach(o => {
		if (!conf.allPowerUps.includes(o.name))
			conf.allPowerUps.push(o.name);
	});
};
