class StartScene extends Phaser.Scene {
	constructor() {
		super("StartScene");
	}

	loadPNGSequence(name, duration) {
		for (let i = 0; i < duration; i++) {
			let istr = ("000" + i).substr(-3);
			let key = name + "_" + istr;
			this.load.image(key);
		}
	}

	preload() {
		this.load.setPath("assets");
		this.load.image("Astronaut", "Astronaut/Astronaut.png");
		this.load.image("Astronaut_Line", "Astronaut/Astronaut_Line.png");
		this.load.image("Shield1", "Fx/ShieldBubble2.png");
		this.load.image("Shield2", "Fx/ShieldBubble.png");

		this.load.setPath("assets/Bg");
		this.load.image([
			{key: "Bg", url: "Bg.jpg"},
			{key: "BgLong", url: "BgLong.jpg"},
			"BgStars", "BgStars2",
			"BgPlanet_01", "BgPlanet_02", "BgPlanet_03", "BgPlanet_04"
		]);

		this.load.setPath("assets/Robot");
		this.load.image(["Robot", "Robot_Hand", "Robot_Line", "RobotShootingRange"]);
		this.load.setPath("assets/Robot/RobotEyesFocus");
		this.loadPNGSequence("RobotEyes", 24);
		this.load.setPath("assets/Robot/RobotHandGrab");
		this.loadPNGSequence("RobotHandGrab", 5);
		this.load.setPath("assets/Robot/RobotHandStart");
		this.loadPNGSequence("RobotHandStart", 8);
		this.load.setPath("assets/Robot/RobotShot");
		this.loadPNGSequence("RobotShot", 13);
		this.load.setPath("assets/Robot/RobotLaser");
		this.loadPNGSequence("RobotLaser", 3);
		this.load.setPath("assets/Robot/RobotLaserEyes");
		this.loadPNGSequence("RobotLaserEyes", 10);

		this.load.setPath("assets");

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

		this.load.setPath("assets/UI");
		this.load.image("StartScreen");
		this.load.image("StartButton");
	}

	create() {
		this.add.image(0, 0, "StartScreen").setOrigin(0, 0);
		let startButton = this.add.image(this.scale.width / 2, conf.startButtonY, "StartButton");
		startButton.isDown = false;

		startButton.setInteractive();
		startButton.on("pointerdown", () => {startButton.isDown = true;});
		startButton.on("pointerup", () => {if (startButton.isDown) this.scene.start("MainScene");});
	}
}

class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");

		this.lastFired = 0;
		this.shieldLevel = 2;

		window.scene = this;
	}

	createPNGSequence(name, duration, props) {
		let frames = [];
		for (let i = 0; i < duration; i++) {
			let istr = ("000" + i).substr(-3);
			let key = name + "_" + istr;
			frames.push({key, frame: 0});
		}

		this.anims.create(Object.assign({
			key: name,
			frames,
		}, props));
	}

	makeParallaxImage(x, y, key, repeat, dy, duration, props) {
		for (let i = -1; i < repeat; i++) {
			let image = this.add.image(x, y, key);
			if (props && props.scale) image.setScale(props.scale);
			if (dy === null)
				dy = image.height;
			image.y = y + dy * i;
			this.tweens.add({
				targets: image,
				y: image.y - dy,
				duration: duration,
				repeat: -1,
			});
		}
	}

	create() {
		// Background
		// this.add.image(0, 0, "Bg").setOrigin(0, 0).setDepth(-10);
		let bg = this.add.image(0, 0, "BgLong")
			.setOrigin(0, 0)
			.setScale(1080/196)
			.setDepth(-10);
		// let bgFlip = this.add.image(0, 0, "BgLong")
		// 	.setOrigin(0, 0)
		// 	.setScale(1080/196, -1080/196)
		// 	.setDepth(-10);
		// bgFlip.y += bgFlip.getBounds().height;
		// this.makeParallaxImage(bg, 3000, bg.getBounds().height * 2);
		// this.makeParallaxImage(bgFlip, 3000, bgFlip.getBounds().height * 2);
		// this.bg2 = this.add.image(0, 0, "BgLong")
		// 	.setOrigin(0, 0)
		// 	.setScale(1080/196, -1080/196)
		// 	.setDepth(-10)
		// 	.setPosition(0, this.bg.getBounds().height);
		// let bgStars = this.add.image(this.scale.width / 2, this.scale.height / 2, "BgStars");

		this.makeParallaxImage(this.scale.width / 2, this.scale.height / 2, "BgStars", 2, null, 10000);
		this.makeParallaxImage(this.scale.width / 2, this.scale.height / 2, "BgStars2", 2, null, 20000);
		// this.makeParallaxImage(200, 2000, "BgPlanet_01", 2, 2000, 15000, {scale: 0.1});
		// this.makeParallaxImage(400, 1500, "BgPlanet_02", 2, 2000, 15000, {scale: 0.1});
		// this.makeParallaxImage(600, 1000, "BgPlanet_03", 2, 2000, 15000, {scale: 0.1});
		// this.makeParallaxImage(800, 500, "BgPlanet_04", 2, 2000, 15000, {scale: 0.1});

		// Inventory
		this.screwContainer = this.add.container(conf.inventoryX, conf.inventoryY)
			.setDepth(1)
			.add(this.add.image(0, 0, "ScrewInventory"));

		// Astronaut
		this.add.image(this.scale.width / 2, conf.lineY, "Astronaut_Line");
		this.add.image(this.scale.width / 2, conf.astronautY, "Astronaut");
		this.shield = this.add.image(this.scale.width / 2, conf.astronautY, "Shield2");

		// UI
		this.uiContainer = this.add.container(0, 0)
			.setDepth(1).setAlpha(0);
		this.uiSocket = this.add.image(0, 0, "UI_Controls").setRotation(Math.PI/2);
		this.uiLeft = this.add.image(conf.uiLeftX, conf.uiLeftY, "UI_Hand")
			.setAlpha(0.2);
		this.uiRight = this.add.image(conf.uiRightX, conf.uiRightY, "UI_Shoot")
			.setAlpha(0.2);
		this.uiContainer.add([this.uiSocket, this.uiLeft, this.uiRight]);

		// Robot
		this.createPNGSequence("RobotEyes", 24, {frameRate: 15});
		this.createPNGSequence("RobotHandGrab", 5);
		this.createPNGSequence("RobotHandStart", 8);
		this.createPNGSequence("RobotShot", 13, {repeat: -1});
		this.createPNGSequence("RobotLaserEyes", 10, {repeat: -1});
		this.createPNGSequence("RobotLaser", 3);

		this.robot = new Robot(this);
		this.add.existing(this.robot);

		this.pulledObject = null;

		// Objects and more
		this.objects = this.add.group({runChildUpdate: true, maxSize: 100});
		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});
		this.hands = this.add.group({runChildUpdate: true, maxSize: 1});

		this.nextObstacle = this.time.now;
		this.nextPowerUp = this.time.now + 5000;
		this.nextScrew = this.time.now + 30000;

		this.collectedScrews = 0;

		// // Input
		// let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// spaceBar.on("down", () => this.down("default"));
		// spaceBar.on("up",   () => this.up("default"));

		// let tab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

		// tab.on("down", () => this.down("hand"));
		// tab.on("up",   () => this.up("hand"));

		this.input.on("pointerdown", (e) => this.down(e));
		this.input.on("pointerup", (e) => this.up(e));
		this.input.on("pointermove", (e) => this.move(e));
	}

	getWeaponFromEvent(e) {
		if (!e)
			return e;
		return e.position ? ((this.downPosition.y - e.position.y > conf.uiYSwitch) ? "hand" : "default") : e;
	}

	move(e) {
		if (!this.robot.charging)
			return;

		this.robot.move(this.getWeaponFromEvent(e));
		this.robot.weaponContainer.rotation = (this.downPosition.x - e.position.x) / conf.shootingRangeAdjustment;
		this.updateUI(e);
	}

	down(e) {
		if (this.time.now < this.lastFired + conf.reloadDelay * 1000)
			return;

		this.downPosition = {x: e.position.x, y: e.position.y};
		this.robot.down();
		this.updateUI(e);
		this.tweens.add({
			targets: this.uiContainer,
			alpha: 0.7,
			duration: 400,
			delay: 100,
		});
	}

	up(e) {
		if (!this.robot.charging && !this.robot.isLasering)
			return;

		this.lastFired = this.time.now;
		let weapon = this.getWeaponFromEvent(e);
		this.robot.up(weapon);
		this.uiContainer.setAlpha(0);
		this.tweens.killTweensOf(this.uiContainer);
		this.updateUI(null);
	}

	updateUI(e) {
		let weapon = this.getWeaponFromEvent(e);

		this.uiContainer.x = this.downPosition.x;
		this.uiContainer.y = this.downPosition.y - 200;
		this.uiLeft.setAlpha(0.2);
		this.uiRight.setAlpha(0.2);
		if (weapon == "default")
			this.uiRight.setAlpha(0.4);
		else if (weapon == "hand")
			this.uiLeft.setAlpha(0.4);
	}

	collectScrew() {
		let x = conf.screwX + this.collectedScrews * conf.screwdX;
		let y = conf.screwY;
		this.screwContainer.add(this.add.image(x, y, "UI_Screw"));
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

		this.hands.getChildren().forEach(h => {
			if (h.pullingBack)
				return;
			this.objects.getChildren().forEach(p => {
				if (inCircle(p.getBounds(), h.x, h.y)) {
					h.pullback();
					p.pullback(h);
					this.pulledObject = p;
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

		this.robot.update(time, delta);
	}

	fullCharge() {
		this.robot.chargingLevel = 0;

		this.robot.shootingRange.visible = false;
		this.robot.eyes.stop();
		this.robot.eyes.setTexture("RobotEyes_000");

		this.uiContainer.setAlpha(0);
		this.tweens.killTweensOf(this.uiContainer);
		this.updateUI(null);

		if (this.hasLaser)
			this.fireLaser();
		else
			this.robot.charging = false;
	}

	fireLaser() {
		let laserC = this.add.container(this.robot.x, this.robot.y)
				.setRotation(this.robot.rotation);
		let laser = this.add.sprite(0, conf.laserY, "RobotLaser")
				.setOrigin(0.5, 0);
		laserC.add(laser);
		laser.play({key: "RobotLaser", hideOnComplete: true})
			.on("animationcomplete", () => this.robot.charging = false);

		let line = new Phaser.Geom.Line(
			this.robot.x,
			this.robot.y,
			this.robot.x - Math.sin(this.robot.rotation) * 3000,
			this.robot.y + Math.cos(this.robot.rotation) * 3000,
		);

		let objects = this.objects.getChildren().slice();
		objects.forEach(o => {
			let circle = new Phaser.Geom.Circle(o.x, o.y, (o.getBounds().width + o.getBounds().height) / 3);
			let result = Phaser.Geom.Intersects.LineToCircle(line, circle);
			if (result) {
				o.destroy();
			}
		});
	}
}
