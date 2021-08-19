import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterByValue,
  filterByTemperament,
  filterCreated,
  getTemperaments,
} from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Nav } from "./Nav";
import Paginado from "./Paginado.jsx";
import s from "./Home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [dogsPerPage, setDogsPage] = useState(9);
  //
  /**
   * El índice del último perro es: la página actual (Default: 1), por la cantidad de perros por página (Default: 9).
   */
  const indexOfLastDog = currentPage * dogsPerPage; // 9
  //|||||||||||||||||||||||||||||||||||||||||||||||
  /**
   * El índice del primer perro es: el índice del último perro (Default: 9), menos la cantidad de perros por página (Default: 9).
   */
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  //||||||||||||||||||||||||||||||||||||||||||||||||
  /**
   * La constante agarra solo las porciones que estan marcadas en los parámetros, que serían el índice del primer perro (0), hasta el índice del último perro (9), por lo tanto quedarían solo 9 perros por página. Renderizando desde el perro numero 0 hasta el perro numero 8, siendo 9 perros en total. Magic.
   * PÁGINA 1 -> Primer perro 0 <---> Último perro 9.
   * PÁGINA 2 -> Primer perro 10 <---> Último perro 19.
   */
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  //+

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  }

  function handleFilterValue(e) {
    e.preventDefault();
    dispatch(filterByValue(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleFilterTemperament = (e) => {
    console.log(e.target.value);
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
  };

  function handleFrom(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div className={s.containerPhader}>
      <div>
        <Nav />
      </div>
      <div>{/* <h1>Henry Dogs!</h1> */}</div>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload the list!
      </button>

      {/* <SearchBar /> */}

      <div className={s.variosSele}>
        <select className={s.sele} onChange={(e) => handleFilterValue(e)}>
          <option value="AZ">Order A-Z</option>
          <option value="ZA">Order Z-A</option>
          <option value="LESS">Order less weight</option>
          <option value="HIGH">Order higher weight</option>
        </select>

        <select className={s.sele} onChange={(e) => handleFrom(e)}>
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="API">API</option>
        </select>

        <select className={s.sele} onChange={(e) => handleFilterTemperament(e)}>
          <option value="all">Todos</option>
          {temperaments?.map((elem) => (
            <option value={elem.name} key={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
      </div>

      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />

      <div className={s.containerCards}>
        {currentDogs &&
          currentDogs.map((el) => {
            return (
              <Link to={"/dogs/" + el.id}>
                <Card
                  name={el.name}
                  img={el.img ? el.img : el.image}
                  temperament={el.temperament}
                  temperaments={el.temperaments}
                  id={el.id}
                  className={s.cardiana}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
