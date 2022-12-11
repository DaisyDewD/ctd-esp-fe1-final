import { Reducer } from "@reduxjs/toolkit";
import { FavoritoActions } from "../actions/favoritos.actions";
import Personaje from "../types/personaje.types";

interface StateFavoritos {
  favoritosMapa: Map<number, Personaje>;
}

const initialState: StateFavoritos = {
  favoritosMapa: new Map(),
};

const favoritosReducer: Reducer<StateFavoritos, FavoritoActions> = (
  state = initialState,
  action
): StateFavoritos => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const map = new Map<number, Personaje>();
      state.favoritosMapa.forEach((personaje) => {
        map.set(personaje.id, personaje);
      });

      state.favoritosMapa.has(action.personaje.id)
        ? map.delete(action.personaje.id)
        : map.set(action.personaje.id, action.personaje);
      return {
        ...state,
        favoritosMapa: map,
      };

    case "REMOVE_ALL_FAVORITE":
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default favoritosReducer;
