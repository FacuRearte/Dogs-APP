import axios from "axios";
import { GET_DOGS, FILTER_BY_VALUE } from "../action/types";
//
const initialState = {
  dogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case FILTER_BY_VALUE:
      let info = state.dogs;
      let sortedArr =
        action.payload === "AZ"
          ? info.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "ZA"
          ? info.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "HIGH"
          ? info.sort(function (a, b) {
              if (
                Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
              ) {
                return -1;
              }
              if (
                Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
              ) {
                return 1;
              }
              return 0;
            })
          : info.sort(function (a, b) {
              if (
                Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
              ) {
                return 1;
              }
              if (
                Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
              ) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    default:
      return state;
  }
}

export default rootReducer;
