import {
  GET_DOGS,
  FILTER_BY_VALUE,
  SEARCH_BY_NAME,
  FILTER_CREATED,
  POST_DOG,
  GET_TEMPERAMENTS,
} from "../action/types";
//
const initialState = {
  dogs: [],
  backupDogs: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        backupDogs: action.payload,
      };
    case POST_DOG:
      return {
        ...state,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case FILTER_CREATED:
      let bc = state.backupDogs;
      let createdFilter =
        action.payload === "CREATED"
          ? bc.filter((el) => el.createdInDb)
          : bc.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "ALL" ? state.backupDogs : createdFilter,
      };
    case FILTER_BY_VALUE:
      let info = state.backupDogs;
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
