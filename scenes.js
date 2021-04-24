class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");

		this.lastFired = 0;
		this.shieldLevel = 2;
	}

	preload() {
		this.load.setPath("assets");
		this.load.image("player");
		this.load.image("Astronaut", "Astronaut/Astronaut.png");
		this.load.image("Astronaut_Line", "Astronaut/Astronaut_Line.png");
		this.load.image("Shield1", "Fx/ShieldBubble2.png");
		this.load.image("Shield2", "Fx/ShieldBubble.png");
		this.load.image("Bg", "Bg/Bg.jpg");

		conf.obstacles.forEach(o => {
			this.load.image(o.name, `Obstacles/Obstacle_${o.name}.png`);
		});

		conf.powerUps.forEach(pu => {
			this.load.image(pu.name, `PowerUps/PowerUp_${pu.name}.png`);
		});

		this.load.image("ScrewInventory","UI/UI_ScrewInventory.png");
		this.load.image("UI_Screw","UI/UI_Screw.png");
		this.load.image("Screw","Collectables/Screw.png");

		this.load.setPath("audio");
		this.load.audio([]);
	}

	create() {
		this.add.image(0, 0, "Bg").setOrigin(0, 0);
		this.add.image(conf.inventoryX, conf.inventoryY, "ScrewInventory");
		this.add.image(this.scale.width / 2, conf.lineY, "Astronaut_Line");
		this.add.image(this.scale.width / 2, conf.astronautY, "Astronaut");
		this.shield = this.add.image(this.scale.width / 2, conf.astronautY, "Shield2");

		this.objects = this.add.group({runChildUpdate: true, maxSize: 10});
		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});
		this.claws = this.add.group({runChildUpdate: true, maxSize: 1});

		this.robot = new Robot(this);
		this.add.existing(this.robot);

		this.lastCreatedPowerUp = this.time.now;
		this.lastCreatedScrew = this.time.now;
		this.lastCreatedObstacle = -Infinity;

		let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		spaceBar.on("down", () => this.down("default"));
		spaceBar.on("up",   () => this.up("default"));

		let tab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

		tab.on("down", () => this.down("claw"));
		tab.on("up",   () => this.up("claw"));

		this.input.on("pointerdown", (e) => this.down(e));
		this.input.on("pointerup", (e) => this.up(e));
		this.input.on("pointermove", (e) => this.move(e));

		this.collectedScrews = 0;

		// this.uileft  = this.add.image(this.scale.width / 4, this.scale.height, "uileft");
		// this.uileft.setOrigin(0.5, 1);
		// this.uiright = this.add.image(3 * this.scale.width / 4, this.scale.height, "uileft");
		// this.uiright.setOrigin(0.5, 1);
	}

	move(e) {
		if (!this.robot.charging)
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
		this.robot.down();
		this.move(e);
	}

	up(e) {
		if (!this.robot.charging)
			return;
		this.lastFired = this.time.now;
		let weapon = e.position ? (e.position.x < this.scale.width / 2 ? "claw" : "default") : e;
		this.robot.up(weapon);
		// this.uileft.alpha = 0.5;
		// this.uiright.alpha = 0.5;
	}

	collectScrew() {
		let x = conf.inventoryX + conf.screwX + this.collectedScrews * conf.screwdX;
		let y = conf.inventoryY + conf.screwY;
		this.add.image(x, y, "UI_Screw");
		this.collectedScrews++;
	}

	loseLife() {
		this.shieldLevel--;
		if (this.shieldLevel < 0)
			this.shieldLevel = 0;
		this.updateShield();
	}

	repairShield() {
		this.shieldLevel++;
		if (this.shieldLevel > 2)
			this.shieldLevel = 2;
		this.updateShield();
	}

	updateShield() {
		switch (this.shieldLevel) {
			case 0:
				this.shield.visible = false;
				break;
			case 1:
				this.shield.visible = true;
				this.shield.setTexture("Shield1");
				break;
			case 2:
				this.shield.visible = true;
				this.shield.setTexture("Shield2");
				break;
		}
	}

	magnetize() {
		this.objects.getChildren().forEach(o => o.magnetize());
	}

	update(time, delta) {
		this.bullets.getChildren().forEach(b => {
			this.objects.getChildren().forEach(o => {
				if (inCircle(o.getBounds(), b.getBounds().centerX, b.getBounds().centerY)) {
					o.destroy();
					b.destroy();
				}
			});
		});

		this.claws.getChildren().forEach(c => {
			if (c.pullingBack)
				return;
			this.objects.getChildren().forEach(p => {
				if (inCircle(p.getBounds(), c.getBounds().centerX, c.getBounds().centerY)) {
					c.pullback();
					p.pullback(c);
				}
			});
		});

		if (time > this.lastCreatedObstacle + conf.obstacleCreationRate * 1000) {
			let obstacle = new Obstacle(this);
			this.objects.add(obstacle, true);
			this.lastCreatedObstacle = time;
		}

		if (time > this.lastCreatedPowerUp + conf.powerUpCreationRate * 1000) {
			let powerUp = new PowerUp(this);
			this.objects.add(powerUp, true);
			this.lastCreatedPowerUp = time;
		}

		if (time > this.lastCreatedScrew + conf.screwCreationRate * 1000) {
			let screw = new Screw(this);
			this.objects.add(screw, true);
			this.lastCreatedScrew = time;
		}

		this.robot.update(delta);
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
