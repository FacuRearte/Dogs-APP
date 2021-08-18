import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDog, getTemperaments } from "../action/index";

export const DogCreate = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Go back!</button>
      </Link>
      <h1>Create your dog</h1>
      <form>
        <div>
          <label>Name</label>
          <input type="text" value={input.name} name="name" />
        </div>
        <div>
          <label>Height</label>
          <input type="text" value={input.height} name="height" />
        </div>
        <div>
          <label>Weight</label>
          <input type="text" value={input.weight} name="weight" />
        </div>
        <div>
          <label>Life Span</label>
          <input type="text" value={input.lifeSpan} name="lifeSpan" />
        </div>
        <div>
          <label>Temperaments</label>
          <input type="checkbox" value={input.temperament} name="temperament" />
        </div>
      </form>
    </div>
  );
};
