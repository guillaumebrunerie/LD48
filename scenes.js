function rand(min, max) {
	return (min + Math.random() * (max - min));
}

class Obstacle extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, "player");
		this.scale = 0.3;
		this.speed = 0.05 * (Math.random() * 3 + 1);
	}

	update(time, delta) {
		this.y -= this.speed * delta;
		if (this.y < -10)
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
		this.centerY = -600;
		this.radius = 1000;
		this.angleMax = 0.3; // Radians
		this.speed = 0.001;

		// The beam
		this.beamAngle = 0.4;
		this.beamSpeed = 2.5;

		this.position = 0; // -1 to +1

		this.paused = false;
		this.timePaused = 0;
	}

	update(delta) {
		if (!this.paused)
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

		if (this.paused) {
			this.timePaused += delta;
			this.beam.rotation = Math.max(0, this.beamAngle - this.timePaused / (1000 * this.beamSpeed));
			this.beam2.rotation = -this.beam.rotation;
		}
	}

	pause() {
		this.beam.visible = true;
		this.beam2.visible = true;
		this.paused = true;
		this.timePaused = 0;
	}

	unpause() {
		this.beam.visible = false;
		this.beam2.visible = false;
		this.paused = false;

		let firingAngle = this.rotation + Math.PI/2 + this.beam.rotation * rand(-1, 1);

		this.scene.fire(this.x, this.y, firingAngle);
		window.navigator.vibrate(100);
	}
}

class Bullet extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y, angle) {
		super(scene, x, y, "player");
		this.scale = 0.1;
		this.speed = 1.5 * (Math.random() * 3 + 1);
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
	}

	preload() {
		this.load.setPath("assets");
		this.load.image(["player"]);

		this.load.setPath("audio");
		this.load.audio([]);
	}

	create() {
		this.obstacles = this.add.group({runChildUpdate: true, maxSize: 10});

		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});

		this.lastCreatedObstacle = 0;
		this.creationRate = 2;
		this.player = new Player(this);
		this.add.existing(this.player);

		this.add.sprite(450, 100, "player");

		let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		spaceBar.on("down", () => this.player.pause());
		spaceBar.on("up",   () => this.player.unpause());

		this.input.on("pointerdown", () => this.player.pause());
		this.input.on("pointerup", () => this.player.unpause());
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

		if (time > this.lastCreatedObstacle + this.creationRate * 1000) {
			let obstacle = new Obstacle(this, Math.random() * 900, 1600);
			this.obstacles.add(obstacle, true);
			this.lastCreatedObstacle = time;
		}

		this.player.update(delta);
	}

	fire(x, y, angle) {
		let bullet = new Bullet(this, x, y, angle);
		this.bullets.add(bullet, true);
	}
}
