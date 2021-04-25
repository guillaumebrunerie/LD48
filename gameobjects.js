// Driftings things consist of obstacles and collectables

class DriftingThing extends Phaser.GameObjects.Sprite {
	constructor(scene, conf) {
		super(scene, Math.random() * scene.scale.width, scene.scale.height, conf.name);
		this.rotation = Math.random() * Math.PI*2;
		this.y = this.y + this.height / 2;
		this.type = conf.name;
		this.scale = rand(conf.scale);
		this.isPulledBack = false;

		this.speedX = rand(conf.speedX);
		this.speedY = rand(conf.speedY);
		this.speedR = rand(conf.speedR);
	}

	update(time, delta) {
		this.x += delta * this.speedX;
		this.y += delta * this.speedY;
		this.rotation += delta * this.speedR;

		if (this.getBounds().bottom < 0) {
			if (this.isPulledBack && this.collect)
				this.collect();
			this.destroy();
		}
	}

	pullback(c) {
		this.isPulledBack = true;
		this.speedX = c.speedX;
		this.speedY = c.speedY;
	}

	magnetize() {
		let speed = Math.sqrt((this.speedX * this.speedX) + (this.speedY * this.speedY));
		let angle = Math.atan2(this.y - this.scene.robot.y, this.x - this.scene.robot.x);
		this.speedX = -speed * Math.cos(angle);
		this.speedY = -speed * Math.sin(angle);
	}
}

class Obstacle extends DriftingThing {
	constructor(scene) {
		super(scene, pick(conf.obstacles));
	}

	magnetize() {}

	collect() {
		this.scene.loseLife();
	}
}

class PowerUp extends DriftingThing {
	constructor(scene) {
		super(scene, pick(conf.powerUps));
	}

	collect() {
		switch (this.type) {
			case "Laser":
				break;
			case "Magnet":
				this.scene.magnetize();
				break;
			case "Shield":
				this.scene.repairShield();
				break;
			case "Target":
				break;
		}
	}
}

class Screw extends DriftingThing {
	constructor(scene) {
		super(scene, pick(conf.screws));
	}

	collect() {
		this.scene.collectScrew();
	}
}


// The robot

class Robot extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, 450, 50);

		let hand = scene.add.sprite(0, conf.handY, "Robot_Hand");
		this.add(hand);
		this.hand = hand;

		let robot = scene.add.sprite(0, 0, "Robot");
		this.add(robot);

		this.eyes = scene.add.sprite(0, conf.eyesY, "RobotEyes_000");
		this.add(this.eyes);

		this.shootingRange = scene.add.sprite(0, conf.shootingRangeY, "RobotShootingRange");
		this.shootingRange.setOrigin(0.5, 0);
		this.shootingRange.setAlpha(1);
		this.shootingRange.visible = false;
		this.add(this.shootingRange);

		// Track where the robot is
		this.centerY = conf.robotY - conf.robotRadius;
		this.radius = conf.robotRadius;
		this.angleMax = conf.angleMax;
		this.speed = conf.robotSpeed;

		// The shootingRange
		this.beamAngle = conf.beamAngle;
		this.beamSpeed = conf.beamSpeed;

		this.position = 0; // -1 to +1

		this.charging = false;
		this.chargingLevel = 0;
	}

	update(time, delta) {
		if (!this.charging)
			this.position += this.speed * delta / 1000;
		if (this.position > 1) {
			this.position = 1;
			this.speed = -this.speed;
		}
		if (this.position < -1) {
			this.position = -1;
			this.speed = -this.speed;
		}

		let easingFactor = 3;
		let easingThreshold = 1 - 1 / (2 * easingFactor);
		let easedPosition = this.position;
		// if (this.position >= easingThreshold)
		// 	easedPosition = 1 - easingFactor * Math.pow(this.position - 1, 2);
		// if (this.position <= -easingThreshold)
		// 	easedPosition = - 1 + easingFactor * Math.pow(this.position + 1, 2);

		let angle = easedPosition * this.angleMax;
		this.y = this.centerY + this.radius * Math.cos(angle);
		this.x = this.scene.scale.width/2 + this.radius * Math.sin(angle);
		this.rotation = -angle;

		if (this.charging) {
			this.chargingLevel += delta / (1000 * this.beamSpeed * conf.beamAngle);
			if (this.chargingLevel > 1)
				this.chargingLevel = 1;
			this.shootingRange.setScale(4 * (1 - this.chargingLevel), 4);
			this.shootingRange.setAlpha(this.chargingLevel / 2);
		}
	}

	down() {
		this.shootingRange.visible = true;
		this.charging = true;
		this.chargingLevel = 0;
		this.eyes.play("RobotEyes");
	}

	up(weapon) {
		this.shootingRange.visible = false;
		this.charging = false;

		let firingAngle = this.rotation + Math.PI/2 + (1 - this.chargingLevel) * rand({min: -conf.beamAngle, max: conf.beamAngle});

		this.scene.fire(this.x, this.y, firingAngle, weapon);
		this.eyes.stop();
		this.eyes.setTexture("RobotEyes_000");
	}

	grab() {
		this.hand.visible = false;
	}

	ungrab() {
		this.hand.visible = true;
	}
}

class Bullet extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y, angle) {
		super(scene, x, y, "RobotShot");
		this.rotation = angle - Math.PI/2;
		let speed = rand(conf.bulletSpeed);
		this.speedX = speed * Math.cos(angle);
		this.speedY = speed * Math.sin(angle);
		this.scale = 1.4;
		this.play("RobotShot");
	}

	update(time, delta) {
		this.oldX = this.x;
		this.oldY = this.y;

		this.x += this.speedX * delta;
		this.y += this.speedY * delta;

		if (this.y > this.scene.scale.height)
			this.destroy();
	}
}

class Hand extends Phaser.GameObjects.Container {
	constructor (scene, x, y, angle) {
		super(scene, x, y);

		let hand = this.hand = scene.add.sprite(0, 0, "Robot_Hand");
		this.add(hand);
		this.hand.play("RobotHandStart");

		let line = this.line = scene.add.sprite(0, 0, "Robot_Line").setOrigin(0.5, 1).setScale(1.1);
		this.add(line);

		const shape = this.scene.make.graphics();
		shape.fillStyle(0xffffff);
		shape.beginPath();
		shape.fillRect(0, conf.robotY, this.scene.scale.width, this.scene.scale.height);
		line.setMask(shape.createGeometryMask());

		this.pullingBack = false;
		this.speedX = conf.handSpeed * Math.cos(angle);
		this.speedY = conf.handSpeed * Math.sin(angle);
		this.rotation = this.scene.robot.rotation;
	}

	update(time, delta) {
		this.oldX = this.x;
		this.oldY = this.y;

		this.x += this.speedX * delta;
		this.y += this.speedY * delta;

		this.rotation = Math.atan2(this.y - this.scene.robot.y, this.x - this.scene.robot.x) - Math.PI/2;

		let dx = this.x - this.scene.robot.x;
		let dy = this.y - this.scene.robot.y;

		if (dy < 0) {
			this.scene.robot.ungrab();
			this.destroy();
			return;
		}

		if (this.y > this.scene.scale.height) {
			this.pullbackFast();
		}

		if (dx > dy) {
			this.x -= (dx - dy);
			if (this.scene.pulledObject)
				this.scene.pulledObject.x -= (dx - dy);
		}
		if (dx < -dy) {
			this.x -= (dx + dy);
			if (this.scene.pulledObject)
				this.scene.pulledObject.x -= (dx + dy);
		}
	}

	pullback() {
		this.pullingBack = true;
		this.speedX = -this.speedX;
		this.speedY = -this.speedY;
		this.hand.play("RobotHandGrab");
	}

	pullbackFast() {
		this.pullingBack = true;
		this.speedX = -this.speedX * 3;
		this.speedY = -this.speedY * 3;
	}
}
