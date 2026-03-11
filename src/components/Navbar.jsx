import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-dark bg-dark px-4">

			<Link to="/" className="navbar-brand mb-0 h1 text-white">
				Star Wars Blog
			</Link>

			<div className="dropdown">

				<button
					className="btn btn-warning dropdown-toggle position-relative"
					data-bs-toggle="dropdown"
				>
					<i className="fa-solid fa-heart me-2"></i>
					Favoritos

					<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
						{store.favorites.length}
					</span>
				</button>

				<ul className="dropdown-menu dropdown-menu-end">

					{store.favorites.length === 0 && (
						<li className="dropdown-item">No hay favoritos</li>
					)}

					{store.favorites.map((fav, index) => (
						<li
							key={index}
							className="dropdown-item d-flex justify-content-between"
						>

							{fav.name}

							<button
								className="btn btn-sm"
								style={{ backgroundColor: "white" }}
								onClick={() =>
									dispatch({
										type: "remove-favorite",
										payload: { uid: fav.uid, type: fav.type }
									})
								}
							>
								<i className="fa-solid fa-trash" style={{ color: "black" }}></i>
							</button>

						</li>
					))}

				</ul>

			</div>

		</nav>
	);
};