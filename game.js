class Player extends Phaser.GameObjects.Image {
	constructor(scene, x, y) {
		super(scene, x, y, "player");

		this.speed = 2;
		this.moving = false;
		this.movingAngle = 0;
		this.targetX = 0;
		this.targetY = 0;
	}

	moveTo({x, y}) {
		this.movingAngle = Math.atan2(y - this.y, x - this.x);
		this.moving = true;
		this.targetX = x;
		this.targetY = y;
	}

	update(delta) {
		if (this.moving) {
			let d = delta * this.speed;
			let r2 = Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2);

			if (d * d > r2) {
				this.x = this.targetX;
				this.y = this.targetY;
				this.moving = false;
			} else {
				this.x += Math.cos(this.movingAngle) * d;
				this.y += Math.sin(this.movingAngle) * d;
			}
		}
	}
}

Phaser.GameObjects.GameObjectFactory.register("player", function (x, y) {
	return this.displayList.add(new Player(this.scene, x, y));
});

class Enemy extends Phaser.GameObjects.Image {
	constructor(scene, x, y) {
		super(scene, x, y, "player");

		this.speed = 0.5;
		this.movingAngle = 0;
		this.targetX = x;
		this.targetY = y;
		this.scale = 0.3;
	}

	moveToNewPlace() {
		let x = Math.random() * 1600;
		let y = Math.random() * 900;
		this.movingAngle = Math.atan2(y - this.y, x - this.x);
		this.moving = true;
		this.targetX = x;
		this.targetY = y;
	}

	update(delta) {
		let d = delta * this.speed;
		let r2 = Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2);

		if (d * d > r2) {
			this.x = this.targetX;
			this.y = this.targetY;
			this.moveToNewPlace();
		} else {
			this.x += Math.cos(this.movingAngle) * d;
			this.y += Math.sin(this.movingAngle) * d;
		}
	}
}

Phaser.GameObjects.GameObjectFactory.register("enemy", function (x, y) {
	return this.displayList.add(new Enemy(this.scene, x, y));
});
