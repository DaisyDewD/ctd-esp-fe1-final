import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { FunctionComponent, useEffect } from "react";
import {TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { fetchPersonajesThunk } from "../../actions/personajes.actions";

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns {React.ReactElement} JSX element
 */
const GrillaPersonajes: FunctionComponent = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const { status, personajes } = useSelector((state) => state.personajes);
    const dispatch = useDispatch();

    if (status === "LOADING") return <div>Cargando personajes...</div>;
    if (status === "FAILED") return <div>No se pudo cargar los personajes.</div>;
    if (!personajes || personajes.length === 0) return <></>;
  
    return (
      <div className="grilla-personajes">
        {personajes.map((personaje) => {
          return (
            <div key={personaje.id}>
              <TarjetaPersonaje personaje={personaje} />
            </div>
          );
        })}
      </div>
    );
  };
  
  export default GrillaPersonajes;
  