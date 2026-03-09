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
    return array?.map((item) => (
      <div key={item.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100">
          <img
            src="https://www.thesun.co.uk/wp-content/uploads/2019/12/VP-PIC-STAR-WARS-3.jpg?quality=90&strip=all"
            className="card-img-top"
            alt={item.name}
          />
          <div className="card-body d-flex flex-column">
            <h5>{item.name}</h5>

            <div className="mt-auto">
              <Link
                to={`/single/${type}/${item.uid}`}
                className="btn btn-primary"
              >
                Detalle
              </Link>
            </div>

          </div>
        </div>
      </div>
    ));
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