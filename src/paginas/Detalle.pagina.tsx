import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useLocation } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector,} from "react-redux";
import Personaje from "../types/personaje.types";
import { IRootState } from "../redux/store";
import { FunctionComponent, useEffect, useState } from "react";
import Episodio from "../types/episodio.types";
import { getEpisodiosThunk } from "../actions/episodios.actions";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 *@returns {React.ReactElement} JSX element la pagina de detalle
 */
 const PaginaDetalle: FunctionComponent = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const { episodios, status } = useSelector((state) => state.episodios);
    const dispatch = useDispatch();
  
    const location = useLocation();
    const state: any = location.state;
    const personaje: Personaje = { ...state.personaje };
  
    const [arrayEpisodioID, setArrayEpisodioID] = useState<(string | undefined)[]>(
      []
    );
  
    useEffect(() => {
      /**
       *  Array de IDs de episodios
       */
      const array: (string | undefined)[] = personaje.episode.map((episodio) => {
        return episodio.split("/").at(-1);
      });
      setArrayEpisodioID(array);
    }, [personaje.episode]);
  
    useEffect(() => {
      dispatch(getEpisodiosThunk(arrayEpisodioID));
    }, [arrayEpisodioID]);
  
    return (
      <div className="container">
        <h3>{personaje.name}</h3>
        <div className={"detalle"}>
          <div className={"detalle-header"}>
            <img src={personaje.image} alt={personaje.name} />
            <div className={"detalle-header-texto"}>
              <p>{personaje.name}</p>
              <p>Planeta: {personaje.origin.name}</p>
              <p>Genero: {personaje.gender}</p>
            </div>
            <BotonFavorito personaje={personaje} />
          </div>
        </div>
        <h4>Lista de episodios donde apareció el personaje</h4>
        <div className={"episodios-grilla"}>
          {status === "LOADING" ? (
            <div>Cargando personajes...</div>
          ) : status === "FAILED" ? (
            <div>No se pudo cargar los personajes.</div>
          ) : !episodios ? (
            <></>
          ) : Array.isArray(episodios) ? (
            episodios.map((episode: Episodio) => {
              return (
                <div key={`episodio_${episode.id}_${personaje.name}`}>
                  <TarjetaEpisodio episodio={episode} />
                </div>
              );
            })
          ) : (
            <TarjetaEpisodio episodio={episodios} />
          )}
        </div>
      </div>
    );
  };
  
  export default PaginaDetalle;
  