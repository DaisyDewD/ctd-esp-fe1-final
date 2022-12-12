import './paginacion.css';
import { FunctionComponent, useState } from "react";
import {TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector,} from "react-redux";
import { changePageThunk } from "../../actions/personajes.actions";
import { IRootState } from "../../store/store";

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns {React.ReactElement} JSX element
 */
 const Paginacion: FunctionComponent = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const dispatch = useDispatch();
  
    const paginaInfo = useSelector((state) => state.personajes.paginaInfo);
    const { count, next, pages, prev } = paginaInfo;
  
    const previusPage = () => {
      dispatch(changePageThunk(prev));
    };
  
    const nextPage = () => {
      dispatch(changePageThunk(next));
    };
  
    return (
      <div className="paginacion">
        <button
          onClick={previusPage}
          disabled={prev === null ? true : false}
          className={"primary"}
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={next === null ? true : false}
          className={"primary"}
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Paginacion;
  