import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByValue, filterCreated } from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import Paginado from "./Paginado.jsx";

export const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(10);
    setCurrentPage(1);
  }

  function handleFilterValue(e) {
    e.preventDefault();
    dispatch(filterByValue(e.target.value));
  }

  function handleFrom(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <Link to="/dogs">Create Dog</Link>
      <h1>All ours dogs!</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload the page!
      </button>
      <div>
        <select onChange={(e) => handleFilterValue(e)}>
          <option value="AZ">Order A-Z</option>
          <option value="ZA">Order Z-A</option>
          <option value="LESS">Order less weight</option>
          <option value="HIGH">Order higher weight</option>
        </select>
        <select onChange={(e) => handleFrom(e)}>
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="API">API</option>
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        {currentDogs &&
          currentDogs.map((el) => {
            return (
              <div>
                <Link to={"/dogs/" + el.id}>
                  <Card
                    name={el.name}
                    img={el.img}
                    temperament={el.temperament}
                    temperaments={el.temperaments}
                    id={el.id}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
