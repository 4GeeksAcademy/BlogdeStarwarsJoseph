import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchData("people", "set-people");
    fetchData("planets", "set-planets");
    fetchData("vehicles", "set-vehicles");
  }, []);

  const fetchData = async (endpoint, actionType) => {
    try {
      const response = await fetch(`https://swapi.tech/api/${endpoint}`);
      const data = await response.json();
      dispatch({ type: actionType, payload: data.results });
    } catch (error) {
      console.error(error);
    }
  };

  const renderCards = (array, type) => {
    return array?.map((item) => {

      const isFavorite = store.favorites.find(
        (fav) => fav.uid === item.uid && fav.type === type
      );

      return (
        <div key={item.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">

          <div className="card h-100">

            <img
              src="https://www.thesun.co.uk/wp-content/uploads/2019/12/VP-PIC-STAR-WARS-3.jpg?quality=90&strip=all"
              className="card-img-top"
              alt={item.name}
            />

            <div className="card-body d-flex flex-column">

              <h5>{item.name}</h5>

              <div className="mt-auto d-flex justify-content-between">

                <Link
                  to={`/single/${type}/${item.uid}`}
                  className="btn"
                  style={{
                    border: "2px solid #0d6efd",
                    backgroundColor: "white",
                    color: "#0d6efd"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#0d6efd";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#0d6efd";
                  }}
                >
                  Detalle
                </Link>

                <button
                  className="btn"
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #ffc107"
                  }}
                  onClick={(e) => {
                    dispatch({
                      type: "add-favorite",
                      payload: { ...item, type }
                    });

                    e.currentTarget.style.transform = "scale(1.3)";
                    setTimeout(() => {
                      e.currentTarget.style.transform = "scale(1)";
                    }, 200);
                  }}
                >
                  <i
                    className={`${isFavorite
                        ? "fa-solid fa-heart text-warning"
                        : "fa-regular fa-heart text-warning"
                      }`}
                  ></i>
                </button>

              </div>

            </div>

          </div>

        </div>
      );
    });
  };

  return (
    <div className="container mt-4">

      <h2>Personajes</h2>
      <div className="row">
        {renderCards(store.people, "people")}
      </div>

      <h2>Planetas</h2>
      <div className="row">
        {renderCards(store.planets, "planets")}
      </div>

      <h2>Vehículos</h2>
      <div className="row">
        {renderCards(store.vehicles, "vehicles")}
      </div>

    </div>
  );
};

export default Home;