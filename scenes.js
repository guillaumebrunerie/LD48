class MainScene extends Phaser.Scene {
	constructor() {
		super("MainScene");
	}

	preload() {
		this.load.setPath("assets");
		this.load.image([]);

		this.load.setPath("audio");
		this.load.audio([]);
	}

	create() {
	}

	update(time, delta) {
	}
}
