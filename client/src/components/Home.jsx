import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
        <select>
          <option value="AZ">Order A-Z</option>
          <option value="ZA">Order Z-A</option>
          <option value="LESS">Order less weight</option>
          <option value="HIGH">Order higher weight</option>
        </select>
        <select>
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="API">API</option>
        </select>
        {allDogs &&
          allDogs.map((el) => {
              return (
                  <div>
            <Link>
              <Card
                name={el.name}
                img={el.img}
                temperament={el.temperament}
                temperaments={el.temperaments}
                id={el.id}
              />
              ;
            </Link>;
            </div>)
          })}
      </div>
    </div>
  );
};
