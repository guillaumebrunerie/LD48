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

		let robot = scene.add.sprite(0, 0, "player");
		this.add(robot);
		robot.scale = 0.4;

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

	update(delta) {
		if (!this.charging)
			this.position += this.speed * delta;
		if (this.position > 1) {
			this.position = 1;
			this.speed = -this.speed;
		}
		if (this.position < -1) {
			this.position = -1;
			this.speed = -this.speed;
		}

		let easedPosition = Math.sin(Math.PI/2 * this.position);

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
	}

	up(weapon) {
		this.beam.visible = false;
		this.beam2.visible = false;
		this.charging = false;

		let firingAngle = this.rotation + Math.PI/2 + this.beam.rotation * rand({min: -1, max: 1});

		this.scene.fire(this.x, this.y, firingAngle, weapon);
		window.navigator.vibrate(10);
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

class Claw extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y, angle) {
		super(scene, x, y, "player");
		this.scale = 0.2;
		this.speedX = conf.clawSpeed * Math.cos(angle);
		this.speedY = conf.clawSpeed * Math.sin(angle);
		this.pullingBack = false;
	}

	update(time, delta) {
		this.oldX = this.x;
		this.oldY = this.y;

		this.x += this.speedX * delta;
		this.y += this.speedY * delta;

		if (this.getBounds().bottom < 0 || this.getBounds().top > this.scene.scale.height)
			this.destroy();
	}

	pullback() {
		this.pullingBack = true;
		this.speedX = -this.speedX;
		this.speedY = -this.speedY;
	}
}
