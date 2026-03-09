import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark px-4">

			<Link to="/" className="navbar-brand mb-0 h1 text-white">
				Star Wars Blog
			</Link>

		</nav>
	);
};