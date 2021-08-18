import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];
  /*
   * Vamos a pushear al arreglo pageNumber, el número redondeado para arriba, del resultado de dividir todos los personajes por el número de personajes deseados.
   */
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }
  /*
   * Ahora si tengo 'pageNumber', mapeamos todos los números que contenga el arreglo.
   */
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map(number => (
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
