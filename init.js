new Phaser.Game({
	type: Phaser.AUTO,
	width: 1600,
	height: 900,
	plugins: {
		scene: [
			{ key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
		]
	},
	scene: [MainScene, GameOverScene],
});
