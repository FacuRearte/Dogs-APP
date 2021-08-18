import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Nav = () => {
  return (
    <div className={style.nav}>
        <div className={style.contenedor}>
            <Link className={style.link}
            to="/home">
            <h1 className={style.name}>Henry Dogs </h1>
        </Link>
            <Link to="/dog" className={style.link}>
                <h2 className={style.create}>Create Dog</h2>
            </Link>
        
        <div className={style.buscador}>
            <SearchBar />
        </div>
        </div>
      
    </div>
  );
};

export default Nav;
