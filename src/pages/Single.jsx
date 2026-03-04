import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { type, uid } = useParams();
  const [detail, setDetail] = useState(null);


  const fetchDetail = async () => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await response.json();
      setDetail(data.result.properties);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [type, uid]);

  if (!detail) {
    return <div className="container mt-5">Cargando...</div>;
  }


  const imageType =
    type === "people"
      ? "characters"
      : type === "planets"
        ? "planets"
        : type === "vehicles"
          ? "vehicles"
          : "placeholder";

  const toggleFavorite = () => {
    const exist = store.favorites.find(
      (fav) => fav.uid === uid && fav.type === type
    );
    if (exist) {
      dispatch({ type: "remove-favorite", payload: { uid, type } });
    } else {
      dispatch({ type: "add-favorite", payload: { ...detail, uid, type } });
    }
  };

  const isFavorite = store.favorites.find(
    (fav) => fav.uid === uid && fav.type === type
  );

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <div className="row">

          <div className="col-md-4">
            <img
              src="https://www.thesun.co.uk/wp-content/uploads/2019/12/VP-PIC-STAR-WARS-3.jpg?quality=90&strip=all"
              className="img-fluid"
              alt={detail.name}
            />
          </div>

          <div className="col-md-8">
            <h2>{detail.name}</h2>

            <button
              className={`btn ${isFavorite ? "btn-danger" : "btn-warning"} mb-3`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>

            <div className="list-group">
              {Object.entries(detail).map(([key, value]) => {
                if (key === "name") return null;
                return (
                  <p key={key} className="list-group-item">
                    <strong>{key.replaceAll("_", " ")}:</strong>{" "}
                    {Array.isArray(value) ? `${value.length} items` : value}
                  </p>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Single;