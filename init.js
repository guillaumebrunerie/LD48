new Phaser.Game({
	type: Phaser.AUTO,
	transparent: false,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 1080,
		height: 1920,
	},
	scene: [MainScene],
});
