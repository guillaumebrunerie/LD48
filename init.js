new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 1600,
		height: 900,
	},
	scene: [MainScene],
});
