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
conf.obstacleSpeed = {min: 0.05, max: 0.2};
conf.obstacleCreationRate = 3;

// Powerups
conf.powerUpSpeed = {min: 0.1, max: 0.4};
conf.powerUpCreationRate = 9;
