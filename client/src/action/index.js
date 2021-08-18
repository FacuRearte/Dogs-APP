import axios from "axios";
import {
  GET_DOGS,
  GET_DETAIL,
  GET_TEMPERAMENTS,
  SEARCH_BY_NAME,
  ADD_DOG,
  ORDER_BY_THING,
  FILTER_TEMPERAMENT,
  FILTER_CREATED,
} from "./types";
//
export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: GET_DOGS,
      payload: json.data,
    });
  };
}
export function getDetail(id) {
  return async (dispatch) => {
    const detail = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: detail.data,
    });
  };
}
export function getTemperaments() {
  return async (dispatch) => {
    let temperaments = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
}
export const searchByName = (name) => {
  return async (dispatch) => {
    const nameSearched = await axios.get(
      `http://localhost:3001/dogs?name=${name}`
    );
    return dispatch({
      type: SEARCH_BY_NAME,
      payload: nameSearched.data,
    });
  };
};
export const addDog = ({
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  yearsMin,
  yearsMax,
  temperament,
}) => {
  return async (dispatch) => {
    await axios.post("http://localhost:3001/dogs/", {
      name,
      height: heightMin + " - " + heightMax,
      weight: weightMin + " - " + weightMax,
      lifeSpan: yearsMin + " - " + yearsMax + " years",
      temperament,
    });
    dispatch({
      type: ADD_DOG,
    });
  };
};
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
export function filterByTemperament(payload) {
  return {
    type: FILTER_TEMPERAMENT,
    payload,
  };
}
export function orderByThing(payload) {
  return {
    type: ORDER_BY_THING,
  };
}