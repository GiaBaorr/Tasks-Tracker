import PropTypes from "prop-types";

function Button({ title, onClick }) {
	return (
		<button className="btn" onClick={onClick}>
			{title}
		</button>
	);
}

Button.propTypes = { title: PropTypes.string.isRequired };
Button.defaultProps = {
	title: "Click",
};

export default Button;
