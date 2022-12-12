import {combineReducers, applyMiddleware, compose, createStore} from "@reduxjs/toolkit";


// Importamos applyMiddleware de Redux, para poder agregar Thunk o Saga como Middleware

import {TypedUseSelectorHook, useSelector as useReduxSelector} from "react-redux";
import thunk from "redux-thunk";
import personajesReducer from "../reducers/personajes.reducer";
import episodiosReducer from "../reducers/episodios.reducer";
import favoritosReducer from "../reducers/favoritos.reducer";




const rootReducer = combineReducers({ //rootReducers puede tener otro nombre pero es un objeto, combineReducers combina todos los reducers
    personajes: personajesReducer, //ya puedo acceder a esto desde cualquier parte de mi app, así mismo si quiero añadir más interfaces y hacerla escalar 
    episodios: episodiosReducer,
    favoritos: favoritosReducer,
   
});

export type IRootState = ReturnType<typeof rootReducer>;


// Tipamos el hook useSelector
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, composeEnhancers(applyMiddleware(thunk)) // Aqui aplicaremos los middlewares
)