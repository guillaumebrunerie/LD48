new Phaser.Game({
	type: Phaser.AUTO,
	transparent: false,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 900,
		height: 1600,
	},
	scene: [MainScene],
});
