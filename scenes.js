class GameOverScene extends Phaser.Scene {
	constructor() {
		super("GameOverScene");
	}

	preload() {
		this.load.setPath("assets");
		this.load.image(["background", "player"]);
	}

	create() {
		// Background
		this.add.image(800, 450, "background");
	}
}

class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");
	}

	preload() {
		this.load.setPath("assets");
		this.load.image(["background", "player"]);

		this.load.setPath("audio");
		this.load.audio("ding", "PP_Collect_Coin_1_1.wav");

		this.load.setPath("export");
		this.load.spine("spineboy", 'spineboy-pro.json', [ 'spineboy.atlas' ], true);
	}

	create() {
		// Background
		this.add.image(800, 450, "background");

		// Player
		this.player = this.add.player(1500, 800);
		this.input.on("pointermove", (e) => {if (e.buttons%2) this.player.moveTo(e.position);});
		this.input.on("pointerdown", (e) => {if (e.buttons%2) this.player.moveTo(e.position);});
		// this.input.on("pointerdown", () => {this.scene.start("GameOverScene");});

		// Enemies
		this.enemies = [];
		for (let i = 0; i < 5; i++)
			this.enemies.push(this.add.enemy(0, 0));

		const man = this.add.spine(512, 650, 'spineboy', "idle", true);
		const container = this.add.spineContainer();
		container.add(man);
	}

	update(time, delta) {
		this.player.update(delta);
		this.enemies.forEach(enemy => enemy.update(delta));
	}
}
