conf = {};

// The inventory
conf.inventoryX = 150;
conf.inventoryY = 80;
conf.screwX = -64;
conf.screwY = 1;
conf.screwdX = 62;

// The astronaut
conf.lineY = 120;
conf.astronautY = 240;

// The robot
conf.robotSpeed = 0.001;
conf.angleMax = 0.3;
conf.robotY = 520;
conf.robotRadius = 1000;

// Shooting beam
conf.beamAngle = 0.3;
conf.beamSpeed = 2.5;

// Bullets
conf.bulletSpeed = 2;
conf.reloadDelay = 0.2;

// Claw
conf.clawSpeed = 1;
conf.clawPullbackSpeed = 0.5;

// Obstacles
conf.obstacleCreationRate = 3;

conf.obstacles = [
	{name: "Asteroid_01", scale: {min: 0.5, max: 1}},
	{name: "Asteroid_02", scale: {min: 0.8, max: 1.4}}
];

// Default values
conf.obstacleSpeedY = {min: -0.05, max: -0.2};
conf.obstacleSpeedX = {min: -0.1, max: 0.1};
conf.obstacleSpeedR = {min: -0.001, max: 0.001};
conf.obstacles.forEach(o => {
	o.speedY = o.speedY === undefined ? conf.obstacleSpeedY : o.speedY;
	o.speedX = o.speedX === undefined ? conf.obstacleSpeedX : o.speedX;
	o.speedR = o.speedR === undefined ? conf.obstacleSpeedR : o.speedR;
	o.scale = o.scale === undefined ? 1 : o.scale;
});

// Powerups
conf.powerUpCreationRate = 6;

conf.powerUps = [
	{name: "Laser"},
	{name: "Magnet"},
	{name: "Shield", speed: {min: 0.4, max: 0.6}},
	{name: "Target"}
];

// Default values
conf.powerUpSpeedY = {min: -0.1, max: -0.4};
conf.powerUpSpeedX = {min: -0.1, max: 0.1};
conf.powerUpSpeedR = {min: -0.001, max: 0.001};
conf.powerUps.forEach(p => {
	p.speedY = p.speedY === undefined ? conf.powerUpSpeedY : p.speedY;
	p.speedX = p.speedX === undefined ? conf.powerUpSpeedX : p.speedX;
	p.speedR = p.speedR === undefined ? conf.powerUpSpeedR : p.speedR;
	p.scale = p.scale === undefined ? 1 : p.scale;
});

// Screw
conf.screwCreationRate = 5;

conf.screws = [
	{name: "Screw", speedX: {min: -0.1, max: 0.1}, speedY: {min: -0.1, max: -0.4}, speedR: {min: -0.001, max: 0.001}, scale: 1}
];
