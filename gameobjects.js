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

		this.isObstacle = false;
	}

	update(time, delta) {
		this.x += delta * this.speedX;
		this.y += delta * this.speedY;
		this.rotation += delta * this.speedR;

		if (this.getBounds().bottom < 0) {
			if (this.isPulledBack)
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

	collect() {}

	explode() {
		this.destroy();
	}
}

class Obstacle extends DriftingThing {
	constructor(scene) {
		super(scene, pick(conf.obstacles));
		this.isObstacle = true;
	}

	magnetize() {}

	collect() {
		this.scene.loseLife();
	}

	explode() {
		if (!this.isExploding) {
			this.isExploding = true;
			this.play("ExplosionDefault");
			this.on("animationcomplete", () => this.destroy());
		}
	}
}

class PowerUp extends DriftingThing {
	constructor(scene) {
		super(scene, pick(conf.powerUps));
	}

	collect() {
		switch (this.type) {
			case "Laser":
				this.scene.robot.hasLaser = true;
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

	explode() {
		if (!this.isExploding) {
			this.isExploding = true;
			this.scene.tweens.add({
				targets: this,
				scale: 0.8,
				alpha: 0,
				duration: 200,
			}).on("complete", () => this.destroy());
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

		let robot = scene.add.sprite(0, conf.bodyY, "Robot");
		this.add(robot);

		this.weaponContainer = scene.add.container(0, -conf.headOriginY);
		this.add(this.weaponContainer);

		this.head = scene.add.sprite(0, conf.headOriginY + conf.headY, "Robot_Head");
		this.weaponContainer.add(this.head);

		this.eyes = scene.add.sprite(0, conf.headOriginY + conf.eyesY, "RobotEyes_000");
		this.weaponContainer.add(this.eyes);

		this.shootingRange = scene.add.sprite(0, conf.headOriginY + conf.shootingRangeY, "RobotShootingRange");
		this.shootingRange.setOrigin(0.5, 0.05);
		this.shootingRange.setAlpha(1);
		this.shootingRange.visible = false;
		this.weaponContainer.add(this.shootingRange);

		this.laser = scene.add.sprite(0, conf.headOriginY + conf.laserY, "RobotLaser")
			.setOrigin(0.5, 0)
			.setVisible(false);
		this.weaponContainer.add(this.laser);

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
		// this.hasLaser = true;
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
			this.shootingRange.setScale(Math.max(4 * (1 - this.chargingLevel), 0.05), 4);
			this.shootingRange.setAlpha(this.chargingLevel / 2);
			if (this.chargingLevel > 1 && this.hasLaser && !this.isLasering) {
				this.startLaser();
			}
		}

		if (this.isLasering) {
			let line = new Phaser.Geom.Line(
				this.x,
				this.y,
				this.x - Math.sin(this.rotation + this.weaponContainer.rotation) * 3000,
				this.y + Math.cos(this.rotation + this.weaponContainer.rotation) * 3000,
			);

			let objects = this.scene.objects.getChildren().slice().filter(o => o.isObstacle);
			objects.forEach(o => {
				let circle = new Phaser.Geom.Circle(o.x, o.y, (o.getBounds().width + o.getBounds().height) / 4);
				let result = Phaser.Geom.Intersects.LineToCircle(line, circle);
				if (result) {
					o.explode();
				}
			});
		}
	}

	move(weapon) {
		this.weapon = weapon;

		// switch (weapon) {
		// 	case "hand":
		// 		this.shootingRange.tint = 0x0000FF;
		// 		break;
		// 	case "default":
		// 		this.shootingRange.tint = 0xFFFFFF;
		// 		break;
		// }
	}

	down(weapon) {
		this.weapon = weapon;
		this.shootingRange.visible = true;
		this.shootingRange.rotation = 0;
		this.charging = true;
		this.chargingLevel = 0;
		this.eyes.play(this.hasLaser ? "RobotLaserEyes" : "RobotEyes");
	}

	up(weapon) {
		if (!this.isLasering)
			this.fire(weapon);
		this.isLasering = false;
		this.laser.visible = false;
		this.shootingRange.visible = false;
		this.weaponContainer.rotation = 0;
		this.charging = false;
		this.eyes.stop();
		this.eyes.setTexture("RobotEyes_000");
	}

	fire(weapon) {
		let angle =
				this.rotation + this.weaponContainer.rotation + Math.PI/2
				+ Math.max(0, 1 - this.chargingLevel) * rand({min: -conf.beamAngle, max: conf.beamAngle});

		switch (weapon) {
			case "default":
				this.scene.bullets.add(new Bullet(this.scene, this.x, this.y, angle), true);
				break;
			case "hand":
				this.hand.visible = false;
				this.scene.hands.add(new Hand(this.scene, this.x, this.y, angle), true).setDepth(-1);
				break;
		}
	}

	startLaser() {
		// let laserC = this.add.container(this.robot.x, this.robot.y)
		// 		.setRotation(this.robot.rotation);
		// let laser = this.add.sprite(0, conf.laserY, "RobotLaser")
		// 		.setOrigin(0.5, 0);
		// laserC.add(laser);
		this.laser.visible = true;
		this.laser.play({key: "RobotLaser"});
		this.isLasering = true;
		this.scene.cameras.main.shake(200, 0.01);
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
		this.scale = conf.bulletScale;
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
		this.speedX = -this.speedX * conf.fastHand;
		this.speedY = -this.speedY * conf.fastHand;
	}
}
