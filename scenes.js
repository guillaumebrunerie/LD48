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
		this.load.image("ShieldBubble", "Fx/ShieldBubble.png");

		this.load.setPath("assets/Fx/ExplosionDefault");
		this.loadPNGSequence("ExplosionDefault", 6);

		this.load.setPath("assets/Fx/ShieldBubbleStart");
		this.loadPNGSequence("ShieldBubbleStart", 15);

		this.load.setPath("assets/Fx/ShieldBubbleEnd");
		this.loadPNGSequence("ShieldBubbleEnd", 3);

		this.load.setPath("assets/Bg");
		this.load.image([
			{key: "Bg", url: "Bg.jpg"},
			{key: "BgLong", url: "BgLong.jpg"},
			"BgStars", "BgStars2",
			"BgPlanet_01", "BgPlanet_02", "BgPlanet_03", "BgPlanet_04"
		]);

		this.load.setPath("assets/Robot");
		this.load.image(["Robot", "Robot_Head", "Robot_Hand", "Robot_Line", "RobotShootingRange"]);
		this.load.setPath("assets/Robot/RobotEyesFocus");
		this.loadPNGSequence("RobotEyes", 24);
		this.load.setPath("assets/Robot/RobotHandGrab");
		this.loadPNGSequence("RobotHandGrab", 4);
		this.load.setPath("assets/Robot/RobotHandStart");
		this.loadPNGSequence("RobotHandStart", 5);
		this.load.setPath("assets/Robot/RobotShot");
		this.loadPNGSequence("RobotShot", 13);
		this.load.setPath("assets/Robot/RobotLaser");
		this.loadPNGSequence("RobotLaser", 3);
		this.load.setPath("assets/Robot/RobotLaserEyes");
		this.loadPNGSequence("RobotLaserEyes", 10);

		this.load.setPath("assets");

		conf.allObstacles.forEach(o => {
			this.load.image(o, `Obstacles/Obstacle_${o}.png`);
		});

		conf.allPowerUps.forEach(pu => {
			this.load.image(pu, `PowerUps/PowerUp_${pu}.png`);
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
		startButton.on("pointerdown", () => {
			this.tweens.add({
				targets: startButton,
				scale: 1.1,
				rotation: -0.1,
				duration: 100,
			});
			startButton.isDown = true;
		});
		startButton.on("pointerout", () => {
			startButton.isDown = false;
			this.tweens.add({
				targets: startButton,
				scale: 1,
				rotation: 0,
				duration: 100,
			});
		});
		startButton.on("pointerup", () => {
			if (startButton.isDown) {
				this.tweens.add({
					targets: startButton,
					scale: 1,
					rotation: 0,
					duration: 100,
					ease: "Quad",
					onComplete: () => this.scene.start("MainScene", 1),
				});
			}
		});
	}
}

class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");

		window.scene = this;
	}

	init(level) {
		this.level = level;
		this.conf = conf.levels[conf.levelNames[level]];
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
			if (props && props.scale)
				image.setScale(props.scale);
			if (props && props.z)
				image.setDepth(props.z);
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

		this.makeParallaxImage(this.scale.width / 2, this.scale.height / 2, "BgStars", 2, null, 10000, {z: -8});
		this.makeParallaxImage(this.scale.width / 2, this.scale.height / 2, "BgStars2", 2, null, 20000, {z: -9});
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
		this.astronaut = this.add.image(this.scale.width / 2, conf.astronautY, "Astronaut");

		this.createPNGSequence("ShieldBubbleStart", 15);
		this.createPNGSequence("ShieldBubbleEnd", 3);

		this.shield1 = this.add.sprite(this.scale.width / 2, conf.astronautY, "ShieldBubble").setScale(1.5);
		this.shield2 = this.add.sprite(this.scale.width / 2, conf.astronautY, "ShieldBubble").setScale(2);

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
		this.createPNGSequence("RobotHandGrab", 4);
		this.createPNGSequence("RobotHandStart", 5);
		this.createPNGSequence("RobotShot", 13, {repeat: -1});
		this.createPNGSequence("RobotLaserEyes", 10, {repeat: -1});
		this.createPNGSequence("RobotLaser", 3);

		this.robot = new Robot(this);
		this.add.existing(this.robot);

		this.pulledObject = null;

		this.createPNGSequence("ExplosionDefault", 6);

		// Objects and more
		this.objects = this.add.group({runChildUpdate: true, maxSize: 100});
		this.bullets = this.add.group({runChildUpdate: true, maxSize: 3});
		this.hands = this.add.group({runChildUpdate: true, maxSize: 1});

		this.nextObstacle = 0;
		this.nextPowerUp = 5000;
		this.nextScrew = 0;

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

		this.gameTime = 0;

		this.lastFired = 0;
		this.shieldLevel = 2;

		this.cameras.main.fadeFrom(1000);
		this.shield2.visible = false;
		this.shield1.visible = false;
		this.time.delayedCall(500, () => {
			this.shield1.visible = true;
			this.shield1.play("ShieldBubbleStart")
				.once("animationcomplete", () => {
					this.shield2.visible = true;
					this.shield2.play("ShieldBubbleStart");
				});
		});
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
		if (this.gameTime < this.lastFired + conf.reloadDelay * 1000)
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

		this.lastFired = this.gameTime;
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

		if (this.collectedScrews == 3)
			this.win();
	}

	loseLife() {
		if (this.shieldLevel == 0) {
			this.gameOver();
			return;
		}

		let shield;
		switch (this.shieldLevel) {
			case 1:
				shield = this.shield1;
				break;
			case 2:
				shield = this.shield2;
				break;
			default:
				return;
		}
		shield.play("ShieldBubbleEnd").once("animationcomplete", () => shield.visible = false);
		this.shieldLevel--;
		window.navigator.vibrate(50);
	}

	repairShield() {
		let shield;
		switch (this.shieldLevel) {
			case 0:
				shield = this.shield1;
				break;
			case 1:
				shield = this.shield2;
				break;
			default:
				return;
		}
		shield.visible = true;
		shield.play("ShieldBubbleStart");
		this.shieldLevel++;
	}

	magnetize() {
		this.objects.getChildren().forEach(o => o.magnetize());
	}

	update(time, delta) {
		this.gameTime += delta;
		// // console.log(`delta: ${delta}, cdelta: ${time - this.lastTime}`);
		// delta = time - this.lastTime;
		// this.lastTime = time;

		let bullets = this.bullets.getChildren().slice();
		let objects = this.objects.getChildren().slice();
		let hands  = this.hands.getChildren().slice();

		bullets.forEach(b => {
			objects.forEach(o => {
				if (!b.scene || !o.scene) return;
				let q = o.getLocalPoint(b.x, b.y);
				let textures = this.scene.systems.textures;
				let alpha = textures.getPixelAlpha(q.x, q.y, o.texture.key);
				if (alpha != null && alpha > 0) {
					o.explode();
					b.destroy();
				}
			});
		});

		objects = this.objects.getChildren().slice();

		hands.forEach(h => {
			if (h.pullingBack)
				return;
			objects.forEach(p => {
				if (!h.scene || !p.scene) return;
				let q = p.getLocalPoint(h.x, h.y);
				let textures = this.scene.systems.textures;
				let alpha = textures.getPixelAlpha(q.x, q.y, p.texture.key);
				if (alpha != null && alpha > 0) {
					h.pullback();
					p.pullback(h);
					this.pulledObject = p;
				}
			});
		});

		objects.forEach(o => {
			if (o.isExploding || !o.isObstacle || !o.scene)
				return;
			let circle = new Phaser.Geom.Circle(o.x, o.y, (o.getBounds().width + o.getBounds().height)/4);

			let shieldSize;
			switch (this.shieldLevel) {
				case 0:
					shieldSize = (this.astronaut.getBounds().width + this.astronaut.getBounds().height) / 4;
					break;
				case 1:
					shieldSize = 250 * 1.5 / 2;
					break;
				case 2:
					shieldSize = 250 * 2 / 2;
					break;
			}

			let shieldCircle = new Phaser.Geom.Circle(this.astronaut.x, this.astronaut.y, shieldSize);
			if (Phaser.Geom.Intersects.CircleToCircle(circle, shieldCircle)) {
				o.collect();
			}
		});

		if (this.gameTime > this.nextObstacle) {
			let obstacle = new Obstacle(this);
			this.objects.add(obstacle, true).setDepth(-2);
			this.nextObstacle = this.gameTime + rand(this.conf.obstacleCreationRate) * 1000;
		}

		if (this.gameTime > this.nextPowerUp) {
			let powerUp = new PowerUp(this);
			this.objects.add(powerUp, true).setDepth(-2);
			this.nextPowerUp = this.gameTime + rand(this.conf.powerUpCreationRate) * 1000;
		}

		if (this.gameTime > this.nextScrew) {
			let screw = new Screw(this);
			this.objects.add(screw, true).setDepth(-2);
			this.nextScrew = this.gameTime + rand(this.conf.screwCreationRate) * 1000;
		}

		this.robot.update(time, delta);
	}

	gameOver() {
		window.navigator.vibrate(200);
		this.cameras.main.fade(500);
		this.time.delayedCall(500, () => this.scene.start("GameOver", this.level));
	}

	win() {
		this.cameras.main.fade(3000, 255, 255, 255);
		let next = this.level + 1;
		this.time.delayedCall(3000, () => this.scene.start("MainScene", next));
	}
}

class GameOver extends Phaser.Scene {
	constructor() {
		super("GameOver");
	}

	preload() {
		this.pieces = [
			"SignalLostTxt1",
			"SignalLost_Astronaut",
			"SignalLostTxt2",
			"SignalLost_Astronaut_Line",
			"TryAgainButton",
		];

		this.load.setPath("assets/UI/SignalLost");
		this.load.image("SignalLostBg");
		this.load.image(this.pieces);

		this.objects = [];
	}

	init(level) {
		this.level = level;
	}

	create() {
		window.scene = this;

		this.cameras.main.fadeFrom(1000);

		this.add.image(0, 0, "SignalLostBg").setOrigin(0, 0);

		let images = [];
		images.push(this.add.image(350, 300, "SignalLost_Astronaut"));
		images.push(this.add.image(800, 1500, "SignalLost_Astronaut_Line"));
		images.push(this.add.image(350, 850, "SignalLostTxt1"));
		images.push(this.add.image(750, 700, "SignalLostTxt2"));

		let drift = (image) => {
			let angle = Math.random() * 2 * Math.PI;
			let speed = 70;
			let dx = speed * Math.cos(angle);
			let dy = speed * Math.sin(angle);
			this.tweens.add({
				targets: image,
				x: image.x + dx,
				y: image.y + dy,
				duration: 3000 + Math.random() * 2000,
			}).on("complete", () => drift(image));
		};
		images.forEach(image => drift(image));

		let button = this.add.image(540, 1370, "TryAgainButton");

		button.setInteractive();
		button.on("pointerdown", () => {
			this.tweens.add({
				targets: button,
				scale: 1.1,
				rotation: -0.1,
				duration: 100,
			});
			button.isDown = true;
		});
		button.on("pointerout", () => {
			button.isDown = false;
			this.tweens.add({
				targets: button,
				scale: 1,
				rotation: 0,
				duration: 100,
			});
		});
		button.on("pointerup", () => {
			if (button.isDown) {
				this.tweens.add({
					targets: button,
					scale: 1,
					rotation: 0,
					duration: 100,
					ease: "Quad",
					onComplete: () => this.scene.start("MainScene", this.level),
				});
			}
		});
	}
}
