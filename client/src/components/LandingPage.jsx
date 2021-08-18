import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import bg from "./imgs/background.jpg";

export const LandingPage = () => {
  return (
    <div className={style.compose}>
      <h1>Welcome to HenryDogs!</h1>
      <Link to="/home">
        <img src={bg} className={style.image}></img>
      </Link>
    </div>
  );
};
