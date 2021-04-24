class Obstacle extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, "player");
		this.scale = 0.4;
		this.speed = rand(conf.obstacleSpeed);
		this.frozen = false;
	}

	update(time, delta) {
		if (this.frozen)
			return;

		this.y -= this.speed * delta;
		if (this.getBottomCenter().y < 0)
			this.destroy();
	}

	freeze() {
		this.frozen = true;
	}
}

class PowerUp extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, "player");
		this.rotation = Math.PI/4;
		this.scale = 0.3;
		this.speed = rand(conf.powerUpSpeed);
	}

	update(time, delta) {

		this.y -= this.speed * delta;
		if (this.getBottomCenter().y < 0)
			this.destroy();
	}
}

class Player extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, 450, 50);

		let player = scene.add.sprite(0, 0, "player");
		this.add(player);
		player.scale = 0.4;

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
		this.centerY = conf.playerY - conf.playerRadius;
		this.radius = conf.playerRadius;
		this.angleMax = conf.angleMax;
		this.speed = conf.playerSpeed;

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
		this.x = 450 + this.radius * Math.sin(angle);
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
		this.speed = conf.clawSpeed;
		this.angle = angle;
	}

	update(time, delta) {
		this.oldX = this.x;
		this.oldY = this.y;

		this.x += this.speed * delta * Math.cos(this.angle);
		this.y += this.speed * delta * Math.sin(this.angle);

		if (this.y > 1600)
			this.destroy();
	}
}

class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");

		this.lastFired = 0;
	}

	preload() {
		this.load.setPath("assets");
		this.load.image(["player"]);

		this.load.setPath("audio");
		this.load.audio([]);
	}

	create() {
		this.obstacles = this.add.group({runChildUpdate: true, maxSize: 10});
		this.powerUps = this.add.group({runChildUpdate: true, maxSize: 10});
		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});
		this.claws = this.add.group({runChildUpdate: true, maxSize: 1});

		this.lastCreatedObstacle = this.time.now;
		this.obstacleCreationRate = conf.obstacleCreationRate;
		this.player = new Player(this);
		this.add.existing(this.player);

		this.lastCreatedPowerUp = this.time.now;
		this.powerUpCreationRate = conf.powerUpCreationRate;

		this.add.sprite(450, 100, "player");

		let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		spaceBar.on("down", () => this.down("default"));
		spaceBar.on("up",   () => this.up("default"));

		let tab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

		tab.on("down", () => this.down("claw"));
		tab.on("up",   () => this.up("claw"));

		this.input.on("pointerdown", (e) => this.down(e));
		this.input.on("pointerup", (e) => this.up(e));
		this.input.on("pointermove", (e) => this.move(e));

		// this.uileft  = this.add.image(this.scale.width / 4, this.scale.height, "uileft");
		// this.uileft.setOrigin(0.5, 1);
		// this.uiright = this.add.image(3 * this.scale.width / 4, this.scale.height, "uileft");
		// this.uiright.setOrigin(0.5, 1);
	}

	move(e) {
		if (!this.player.charging)
			return;

		// if (e == "claw" || (e !== "default" && e.position.x < this.scale.width / 2)) {
		// 	this.uileft.alpha = 1;
		// 	this.uiright.alpha = 0;
		// } else {
		// 	this.uileft.alpha = 0;
		// 	this.uiright.alpha = 1;
		// }
	}

	down(e) {
		if (this.time.now < this.lastFired + conf.reloadDelay * 1000)
			return;
		this.player.down();
		this.move(e);
	}

	up(e) {
		if (!this.player.charging)
			return;
		this.lastFired = this.time.now;
		let weapon = e.position ? (e.position.x < this.scale.width / 2 ? "claw" : "default") : e;
		this.player.up(weapon);
		// this.uileft.alpha = 0.5;
		// this.uiright.alpha = 0.5;
	}

	update(time, delta) {
		this.bullets.getChildren().forEach(b => {
			this.obstacles.getChildren().forEach(o => {
				if (Phaser.Geom.Intersects.RectangleToRectangle(o.getBounds(), b.getBounds())) {
					o.destroy();
					b.destroy();
				}
			});
		});

		this.claws.getChildren().forEach(c => {
			this.obstacles.getChildren().forEach(o => {
				if (Phaser.Geom.Intersects.RectangleToRectangle(o.getBounds(), c.getBounds())) {
					c.destroy();
					o.freeze();
				}
			});
		});

		if (time > this.lastCreatedObstacle + this.obstacleCreationRate * 1000) {
			let obstacle = new Obstacle(this, Math.random() * 900, 1600);
			this.obstacles.add(obstacle, true);
			this.lastCreatedObstacle = time;
		}

		if (time > this.lastCreatedPowerUp + this.powerUpCreationRate * 1000) {
			let powerUp = new PowerUp(this, Math.random() * 900, 1600);
			this.powerUps.add(powerUp, true);
			this.lastCreatedPowerUp = time;
		}

		this.player.update(delta);
	}

	fire(x, y, angle, weapon) {
		switch (weapon) {
			case "default":
				this.bullets.add(new Bullet(this, x, y, angle), true);
				break;
			case "claw":
				this.claws.add(new Claw(this, x, y, angle), true);
				break;
		}
	}
}
