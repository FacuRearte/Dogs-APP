import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ name, img, temperament, temperaments, id }) => {
  return (
    <div>
      <h3>{name}</h3>
      <Link to={`/dogs/${id}`}>
        <img
          src={img}
          alt="breed"
          width="150"
          height="150"
        />
        <div>
          <p>
            Temperament:{" "}
            {temperament
              ? temperament.map((el) => el + ", ")
              : temperaments?.map((el) => el.name + ", ")}
          </p>
        </div>
      </Link>
    </div>
  );
};