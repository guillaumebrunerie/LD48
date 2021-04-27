new Phaser.Game({
	title: "Space Buddies",
	url: "The URL of our game!",
	type: Phaser.AUTO,
	transparent: true,
	fps: {
		smoothstep: false,
	},
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		width: 1080,
		height: 1920,
	},
	scene: [StartScene, MainScene, GameOver, LevelComplete, HUD],
});
