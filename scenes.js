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

		this.load.image("UI_Controls", "UI/UI_ControlsSocket.png");
		this.load.image("UI_Hand", "UI/UI_ControlsButton_Hand.png");
		this.load.image("UI_Shoot", "UI/UI_ControlsButton_Shoot.png");

		this.load.setPath("audio");
		this.load.audio([]);
	}

	create() {
		this.add.image(0, 0, "Bg").setOrigin(0, 0);
		this.add.image(conf.inventoryX, conf.inventoryY, "ScrewInventory");
		this.add.image(this.scale.width / 2, conf.lineY, "Astronaut_Line");
		this.add.image(this.scale.width / 2, conf.astronautY, "Astronaut");
		this.shield = this.add.image(this.scale.width / 2, conf.astronautY, "Shield2");
		this.uiContainer = this.add.container(this.scale.width / 2, conf.uiY)
			.setDepth(1);
		this.uiSocket = this.add.image(0, 0, "UI_Controls");
		this.uiLeft = this.add.image(conf.uiLeftX, conf.uiLeftY, "UI_Hand")
			.setAlpha(0.2);
		this.uiRight = this.add.image(conf.uiRightX, conf.uiRightY, "UI_Shoot")
			.setAlpha(0.2);
		this.uiContainer.add([this.uiSocket, this.uiLeft, this.uiRight]);

		this.objects = this.add.group({runChildUpdate: true, maxSize: 10});
		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});
		this.claws = this.add.group({runChildUpdate: true, maxSize: 1});

		this.robot = new Robot(this);
		this.add.existing(this.robot);

		this.nextObstacle = this.time.now;
		this.nextPowerUp = this.time.now + 5000;
		this.nextScrew = this.time.now + 30000;

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
		this.lastTime = this.time.now;
	}

	move(e) {
		if (!this.robot.charging)
			return;

		this.updateUI(e);
	}

	down(e) {
		if (this.time.now < this.lastFired + conf.reloadDelay * 1000)
			return;
		this.robot.down();
		this.updateUI(e);
	}

	up(e) {
		if (!this.robot.charging)
			return;
		this.lastFired = this.time.now;
		let weapon = e.position ? (e.position.x < this.scale.width / 2 ? "claw" : "default") : e;
		this.robot.up(weapon);
		this.updateUI(null);
	}

	updateUI(e) {
		let weapon;
		if (e && e.position)
			weapon = (e.position.x < this.scale.width / 2) ? "claw" : "default";
		else
			weapon = e;

		this.uiLeft.setAlpha(0.2);
		this.uiRight.setAlpha(0.2);
		if (weapon == "default")
			this.uiRight.setAlpha(0.4);
		else if (weapon == "claw")
			this.uiLeft.setAlpha(0.4);
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
		window.navigator.vibrate(100);
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
		// // console.log(`delta: ${delta}, cdelta: ${time - this.lastTime}`);
		// delta = time - this.lastTime;
		// this.lastTime = time;

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

		if (time > this.nextObstacle) {
			let obstacle = new Obstacle(this);
			this.objects.add(obstacle, true);
			this.nextObstacle = time + rand(conf.obstacleCreationRate) * 1000;
		}

		if (time > this.nextPowerUp) {
			let powerUp = new PowerUp(this);
			this.objects.add(powerUp, true);
			this.nextPowerUp = time + rand(conf.powerUpCreationRate) * 1000;
		}

		if (time > this.nextScrew) {
			let screw = new Screw(this);
			this.objects.add(screw, true);
			this.nextScrew = time + rand(conf.screwCreationRate) * 1000;
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
