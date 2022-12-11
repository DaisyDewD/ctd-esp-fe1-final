import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { getPersonajesAPI, changePage } from "../services/personaje.services";
import { IRootState } from "../store/store";
import PageInfo from "../types/pageInfo.types";
import Personaje from "../types/personaje.types";

interface getPersonajesAccion extends Action {
  type: "GET_PERSONAJES";
  query: string;
}
interface getPersonajesSuccessAccion extends Action {
  type: "GET_PERSONAJES_SUCCESS";
  personajes: Personaje[];
  pageInfo: PageInfo;
}
interface getPersonajesErrorAccion extends Action {
  type: "GET_PERSONAJES_ERROR";
  error: string | number;
}

const getPersonajes: ActionCreator<getPersonajesAccion> = (query: string) => {
  return {
    type: "GET_PERSONAJES",
    query: query,
  };
};

const getPersonajesSuccess: ActionCreator<getPersonajesSuccessAccion> = (
  personajes: Personaje[],
  pageInfo: PageInfo
) => {
  return {
    type: "GET_PERSONAJES_SUCCESS",
    personajes: personajes,
    pageInfo: pageInfo,
  };
};

const getPersonajesError: ActionCreator<getPersonajesErrorAccion> = (
  mensaje: string | number
) => {
  return {
    type: "GET_PERSONAJES_ERROR",
    error: mensaje,
  };
};

export type PersonajeActions =
  | ReturnType<typeof getPersonajes>
  | ReturnType<typeof getPersonajesSuccess>
  | ReturnType<typeof getPersonajesError>;

interface FetchPersonajesThunkAction
  extends ThunkAction<void, IRootState, unknown, PersonajeActions> {}

export const fetchPersonajesThunk = (
  query: string
): FetchPersonajesThunkAction => {
  return async (dispatch, getState) => {
    dispatch(getPersonajes(query));
    try {
      const response = await getPersonajesAPI(query);
      const [personajes, info, status] = response;
      if (status === 200) {
        dispatch(getPersonajesSuccess(personajes, info));
      } else {
        dispatch(getPersonajesError(status));
      }
    } catch (e) {
      dispatch(getPersonajesError(e));
    }
  };
};

export const changePageThunk = (url: string): FetchPersonajesThunkAction => {
  return async (dispatch, getState) => {
    try {
      const [personajes, info] = await changePage(url);
      dispatch(getPersonajesSuccess(personajes, info));
    } catch (e) {
      dispatch(getPersonajesError(e));
    }
  };
};
