import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDog, getTemperaments } from "../action/index";
import style from './DogCreate.module.css'

export const DogCreate = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    yearsMin: "",
    yearsMax: "",
    temperament: [],
  };

  const [values, setValues] = useState(initialState);
  const [namesTemp, setNamesTemp] = useState([]);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    let index = e.target.selectedIndex;
    setNamesTemp((names) => [...names, e.target.options[index].text]);
    setValues((values) => ({
      ...values,
      temperament: [...values.temperament, Number(e.target.value)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name &&
      values.heightMin &&
      values.heightMax &&
      values.weightMin &&
      values.weightMax &&
      values.temperament
    ) {
      dispatch(addDog(values));
      setErrors(false);
      setSuccess(true);
      setValues(initialState);
      setNamesTemp([]);
    } else {
      setSuccess(false);
      setErrors(true);
    }
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.todo}>
      <h1>Create your own dog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Height min: </label>
          <input
            type="text"
            name="heightMin"
            value={values.heightMin}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Height max: </label>
          <input
            type="text"
            name="heightMax"
            value={values.heightMax}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Weight min: </label>
          <input
            type="text"
            name="weightMin"
            value={values.weightMin}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Weight max: </label>
          <input
            type="text"
            name="weightMax"
            value={values.weightMax}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Life Span min: </label>
          <input
            type="text"
            name="yearsMin"
            value={values.yearsMin}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Life Span max: </label>
          <input
            type="text"
            name="yearsMax"
            value={values.yearsMax}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label>Temperaments: </label>
          <select onChange={handleSelect}>
            <option value="all">Todos</option>
            {temperaments?.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </select>
          <ul>
            <h3>Selected temperaments: </h3>
            <div>
              {namesTemp?.map((elem, i) => (
                <div key={i}>
                  <p>{elem}</p>
                </div>
              ))}
            </div>
          </ul>
        </div>
        <div className={style.submiteo}>
          <button type="submit">Create!</button>
        </div>
        <div classname={style.labbel}>
        <h5>Press Henry Logo for go back</h5>
        </div>
        <div className={style.divino}>
          <Link to="/home">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6GuaWluMmyLbR8DqY1QuaQBzeuQywdaqys036yFBbfxdrCnPTDlO5X0J9dBGNpzvMPE&usqp=CAU"
              alt={'Henrylogo'}
              width={150}
              height={150}
            />
          </Link>
        </div>
      </form>
      {success ? <h2>Created Successfully</h2> : null}
      {errors ? <h2>Something went wrong!</h2> : null}
    </div>
  );
};
