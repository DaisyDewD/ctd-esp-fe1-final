import { Reducer } from "@reduxjs/toolkit";
import { PersonajeActions } from "../actions/personajes.actions";
import PaginaInfo from "../types/paginaInfo.types";
import Personaje from "../types/personaje.types";

interface PersonajesState {
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  personajes: Personaje[];
  query: string;
  paginaInfo: PaginaInfo;
  error: string | number | null;
}

const initialState: PersonajesState = {
  status: "IDLE",
  personajes: [],
  query: "",
  paginaInfo: { count: 0, pages: 0, next: "", prev: "" },
  error: null,
};

/**
 * Personajes reducer
 *
 * @param {State} state
 * @param {DataStore.Reducer<PersonajesState, PersonajeActions>} action
 *
 * @returns {State}
 */
const personajesReducer: Reducer<PersonajesState, PersonajeActions> = (
  state = initialState,
  action
): PersonajesState => {
  switch (action.type) {
    case "GET_PERSONAJES":
      return {
        ...state,
        status: "LOADING",
        personajes: [],
        query: action.query,
        error: null,
      };
    case "GET_PERSONAJES_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        personajes: action.personajes,
        paginaInfo: action.paginaInfo,
      };
    case "GET_PERSONAJES_ERROR":
      return {
        ...state,
        status: "FAILED",
        personajes: [],
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default personajesReducer;
