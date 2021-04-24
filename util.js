function rand(props) {
	if (!isNaN(props))
		return props;
	return (props.min + Math.random() * (props.max - props.min));
}

function pick(array) {
	let n = array.length;
	return (array[Math.floor(n * Math.random())]);
}
