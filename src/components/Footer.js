import { Link } from "react-router-dom";
function Footer({ isHomePage }) {
	return (
		<footer>
			<p>Copyright &copy; 2021</p>
			<Link to={isHomePage ? "/about" : "/"}>
				{isHomePage ? "About" : "Go to Tasks"}
			</Link>
		</footer>
	);
}
export default Footer;
