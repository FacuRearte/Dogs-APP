import React from "react";
import { Link } from "react-router-dom";
import imgs from "./imgs/noimg.jpg";

import s from "./Card.module.css";

export const Card = ({ name, img, temperament, temperaments, id }) => {
  return (
    <div className={s.container}>
      <Link to={`/dogs/${id}`}>
        <img src={img ? img : imgs} alt="breed" className="s.pict"/>
        <h3 id={s.name}>{name}</h3>
        <u>Temperament</u> <br />
        {temperament
          ? temperament.map((el) => "  " + el + "")
          : temperaments?.map((el) => el.name + ",")}
      </Link>
    </div>
  );
};