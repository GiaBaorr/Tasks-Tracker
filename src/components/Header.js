import PropTypes from "prop-types";
import Button from "./Button";

function Header({ title, onShowAddTask, showAddTask }) {
	return (
		<header className="header">
			<h1>{title}</h1>
			<Button title={showAddTask ? "Close" : "Add"} onClick={onShowAddTask} />
		</header>
	);
}

Header.defaultProps = {
	title: "Don't get title",
};
Header.propTypes = {
	title: PropTypes.string,
};
export default Header;
