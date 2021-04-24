function rand(props) {
	if (!isNaN(props))
		return props;
	return (props.min + Math.random() * (props.max - props.min));
}
