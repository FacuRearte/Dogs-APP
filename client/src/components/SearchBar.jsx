import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../action";
import style from './Nav.module.css'


export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  //
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
    setName(' ')
  }
  //
  return (
    <div className={style.conteiner}>
      <input
        className={style.input}
        value={name}
        type="text"
        placeholder="Search Dog"
        onChange={(e) => handleInputChange(e)}
      />
      <button
      className={style.btn} 
      type="submit"
      onClick={(e) => handleSubmit(e)}
      >Search</button> 
    </div>
  );
}
