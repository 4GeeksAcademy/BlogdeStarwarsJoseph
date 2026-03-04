import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();

	return (
		<nav className="navbar navbar-dark bg-dark px-4">
			<Link to="/" className="navbar-brand mb-0 h1 text-white">
				Star Wars Blog
			</Link>

			<div className="dropdown">
				<button className="btn btn-warning">
					<i className="fa-solid fa-star text-dark me-2"></i>
					Favoritos
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
								className="btn btn-sm btn-danger"
								onClick={() =>
									dispatch({
										type: "remove_favorite",
										payload: {
											uid: fav.uid,
											type: fav.type
										}
									})
								}
							>
								Eliminar
							</button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}