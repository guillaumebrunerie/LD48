function rand(props) {
	if (!isNaN(props))
		return props;
	return (props.min + Math.random() * (props.max - props.min));
}

function pick(array) {
	let n = array.length;
	return (array[Math.floor(n * Math.random())]);
}

function inCircle(rect, x, y) {
	let dx = rect.centerX - x;
	let dy = rect.centerY - y;
	let d2 = dx * dx + dy * dy;
	let radius = (rect.width + rect.height) / 4;
	return (radius * radius > d2);
}
