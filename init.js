new Phaser.Game({
	type: Phaser.AUTO,
	transparent: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 1080,
		height: 1920,
	},
	scene: [MainScene],
});
