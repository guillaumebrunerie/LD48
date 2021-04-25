new Phaser.Game({
	title: "The title of our game!",
	url: "The URL of our game!",
	type: Phaser.AUTO,
	transparent: false,
	fps: {
		smoothstep: false,
	},
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 1080,
		height: 1920,
	},
	scene: [MainScene],
});
