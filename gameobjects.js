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

		this.beam = scene.add.sprite(0, 0, "player");
		this.beam.setOrigin(0.5, 0);
		this.beam.scaleX = 0.1;
		this.beam.scaleY = 10;
		this.beam.visible = false;
		this.add(this.beam);

		this.beam2 = scene.add.sprite(0, 0, "player");
		this.beam2.setOrigin(0.5, 0);
		this.beam2.scaleX = 0.1;
		this.beam2.scaleY = 10;
		this.beam2.visible = false;
		this.add(this.beam2);

		// Track where the robot is
		this.centerY = conf.robotY - conf.robotRadius;
		this.radius = conf.robotRadius;
		this.angleMax = conf.angleMax;
		this.speed = conf.robotSpeed;

		// The beam
		this.beamAngle = conf.beamAngle;
		this.beamSpeed = conf.beamSpeed;

		this.position = 0; // -1 to +1

		this.charging = false;
		this.timeCharging = 0;
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
			this.timeCharging += delta;
			this.beam.rotation = Math.max(0, this.beamAngle - this.timeCharging / (1000 * this.beamSpeed));
			this.beam2.rotation = -this.beam.rotation;
		}
	}

	down() {
		this.beam.visible = true;
		this.beam2.visible = true;
		this.charging = true;
		this.timeCharging = 0;
		this.eyes.play("RobotEyes");
	}

	up(weapon) {
		this.beam.visible = false;
		this.beam2.visible = false;
		this.charging = false;

		let firingAngle = this.rotation + Math.PI/2 + this.beam.rotation * rand({min: -1, max: 1});

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
		super(scene, x, y, "player");
		this.scale = 0.1;
		this.speed = rand(conf.bulletSpeed);
		this.angle = angle;
	}

	update(time, delta) {
		this.oldX = this.x;
		this.oldY = this.y;

		this.x += this.speed * delta * Math.cos(this.angle);
		this.y += this.speed * delta * Math.sin(this.angle);

		if (this.getTopCenter().y > this.scene.scale.height)
			this.destroy();
	}
}

class Hand extends Phaser.GameObjects.Container {
	constructor (scene, x, y, angle) {
		super(scene, x, y);

		let hand = this.hand = scene.add.sprite(0, 0, "Robot_Hand");
		this.add(hand);
		this.hand.play("RobotHandStart");

		let line = this.line = scene.add.sprite(0, 0, "Robot_Line").setOrigin(0.5, 1);
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

		if (this.y < this.scene.robot.y) {
			this.scene.robot.ungrab();
			this.destroy();
			return;
		}

		if (this.y > this.scene.scale.height) {
			this.pullbackFast();
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
