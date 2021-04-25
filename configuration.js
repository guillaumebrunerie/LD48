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

// Shooting beam
conf.beamAngle = 0.3;
conf.beamSpeed = 3.5;
conf.shootingRangeY = 0;
conf.shootingRangeAdjustment = 2000;

// Bullets
conf.bulletSpeed = 2;
conf.reloadDelay = 0;
conf.bulletScale = 1.4;

// Laser
conf.laserY = -65;

// Hand
conf.handSpeed = 1;
conf.handPullbackSpeed = 0.5;
conf.fastHand = 5;

// Obstacles
conf.obstacleCreationRate = {min: 1, max: 3};

conf.obstacles = [
	{name: "Asteroid_01", scale: {min: 0.5, max: 1}},
	{name: "Asteroid_02", scale: {min: 0.8, max: 1.4}},
	{name: "Asteroid_03", scale: {min: 0.8, max: 1.4}},
	{name: "Small_Asteroid_01", scale: {min: 0.8, max: 1.4}},
	{name: "Small_Asteroid_02", scale: {min: 0.8, max: 1.4}}
];

conf.obstacleDefault = {
	speedX: {min: -0.1, max: 0.1},
	speedY: {min: -0.05, max: -0.2},
	speedR: {min: -0.001, max: 0.001},
	scale: 1,
};

// Powerups
conf.powerUpCreationRate = {min: 2, max: 5};

conf.powerUps = [
	{name: "Laser"},
	{name: "Laser"},
	{name: "Laser"},
	{name: "Magnet"},
	{name: "Shield", speed: {min: 0.4, max: 0.6}},
	{name: "Target"}
];

conf.powerUpDefault = {
	speedX: {min: -0.1, max: 0.1},
	speedY: {min: -0.1, max: -0.4},
	speedR: {min: -0.001, max: 0.001},
	scale: 1,
};

// Screws
conf.screwCreationRate = {min: 10, max: 30};

conf.screws = [
	{name: "Screw", speedX: {min: -0.1, max: 0.1}, speedY: {min: -0.1, max: -0.4}, speedR: {min: -0.001, max: 0.001}, scale: 1}
];


//// Apply the default values

function defaultize(array, def) {
	array.forEach(x => {
		Object.keys(def).forEach(key => {
			if (! (key in x))
				x[key] = def[key];
		});
	});
}

defaultize(conf.obstacles, conf.obstacleDefault);
defaultize(conf.powerUps, conf.powerUpDefault);
