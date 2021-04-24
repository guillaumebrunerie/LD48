conf = {};

// The robot
conf.playerSpeed = 0.001;
conf.angleMax = 0.3;
conf.playerY = 400;
conf.playerRadius = 1000;

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
conf.obstacleSpeed = {min: 0.05, max: 0.2};
conf.obstacleRotationSpeed = {min: -0.001, max: 0.001};
conf.obstacles.forEach(o => {
	o.speed = o.speed === undefined ? conf.obstacleSpeed : o.speed;
	o.rSpeed = o.rSpeed === undefined ? conf.obstacleRotationSpeed : o.rSpeed;
	o.scale = o.scale === undefined ? 1 : o.scale;
});

// Powerups
conf.powerUpCreationRate = 9;

conf.powerUps = [
	{name: "Laser"},
	{name: "Magnet"},
	{name: "Shield", speed: {min: 0.4, max: 0.6}},
	{name: "Target"}
];

// Default values
conf.powerUpSpeed = {min: 0.1, max: 0.4};
conf.powerUpRotationSpeed = {min: -0.001, max: 0.001};
conf.powerUps.forEach(p => {
	p.speed = p.speed === undefined ? conf.powerUpSpeed : p.speed;
	p.rSpeed = p.rSpeed === undefined ? conf.powerUpRotationSpeed : p.rSpeed;
	p.scale = p.scale === undefined ? 1 : p.scale;
});
