class Obstacle extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y) {
		super(scene, x, y, "player");
		this.scale = 0.3;
		this.speed = 0.05 * (Math.random() * 3 + 1);
	}

	update(delta) {
		this.y -= this.speed * delta;
	}
}

class Player extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, 450, 50);

		let player = scene.add.sprite(0, 0, "player");
		this.add(player);
		player.scale = 0.4;

		this.beam = scene.add.sprite(0, 0, "player");
		this.beam.scaleX = 0.1;
		this.beam.scaleY = 10;
		this.beam.visible = false;
		this.add(this.beam);

		this.beam2 = scene.add.sprite(0, 0, "player");
		this.beam2.scaleX = 0.1;
		this.beam2.scaleY = 10;
		this.beam2.visible = false;
		this.add(this.beam2);

		this.speed = 0.001;
		this.position = 0; // -1 to +1

		this.centerY = -600;
		this.radius = 1000;
		this.angleMax = 0.3; // Radians

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
		let angle = this.position * this.angleMax;
		this.y = this.centerY + this.radius * Math.cos(angle);
		this.x = 450 + this.radius * Math.sin(angle);
		this.rotation = -angle;

		if (this.paused) {
			this.timePaused += delta;
			this.beam.rotation = Math.max(0, 0.3 - this.timePaused / 3000);
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
		this.scene.fire(this.x, this.y, this.rotation + Math.PI / 2);
		window.navigator.vibrate(100);
	}
}

class Bullet extends Phaser.GameObjects.Sprite {
	constructor (scene, x, y, angle) {
		super(scene, x, y, "player");
		this.scale = 0.1;
		this.speed = 2 * (Math.random() * 3 + 1);
		this.angle = angle;
	}

	update(delta) {
		this.x += this.speed * delta * Math.cos(this.angle);
		this.y += this.speed * delta * Math.sin(this.angle);
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
		this.obstacles = [];
		this.bullets = [];
		this.lastCreatedObstacle = 0;
		this.creationRate = 2;
		this.player = new Player(this);
		this.add.existing(this.player);

		this.add.sprite(450, 100, "player");

		this.input.on("pointerdown", () => this.player.pause());
		this.input.keyboard.on("keydown", () => this.player.pause());
		this.input.on("pointerup", () => this.player.unpause());
		this.input.keyboard.on("keyup", () => this.player.unpause());
	}

	update(time, delta) {
		this.obstacles.forEach(o => {
			this.bullets.forEach(b => {
				if (Phaser.Geom.Intersects.RectangleToRectangle(o.getBounds(), b.getBounds())) {
					o.destroy();
					b.destroy();
				}
			});
		});

		if (time > this.lastCreatedObstacle + this.creationRate * 1000) {
			let obstacle = new Obstacle(this, Math.random() * 900, 1600);
			this.add.existing(obstacle);
			this.obstacles.push(obstacle);
			this.lastCreatedObstacle = time;
		}

		this.bullets.forEach(b => b.update(delta));
		this.obstacles.forEach(o => o.update(delta));
		this.player.update(delta);
	}

	fire(x, y, angle) {
		let bullet = new Bullet(this, x, y, angle);
		this.add.existing(bullet);
		this.bullets.push(bullet);
	}
}
