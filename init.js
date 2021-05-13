new Phaser.Game({
	title: "Space Buddies",
	url: "https://latcarf.itch.io/space-buddies",
	type: Phaser.AUTO,
	transparent: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		width: 1080,
		height: 1920,
	},
	scene: [StartScene, MainScene, GameOver, LevelComplete, GameComplete, HUD],
});
