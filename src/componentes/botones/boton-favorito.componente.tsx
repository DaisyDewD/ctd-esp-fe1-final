import './boton-favorito.css';
import { FunctionComponent } from "react";
import { IRootState } from "../../store/store";
import Personaje from "../../types/personaje.types";
import { toggleFavorito } from "../../actions/favoritos.actions";
import {TypedUseSelectorHook,useDispatch,useSelector as useReduxSelector,} from "react-redux";
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @param {Personaje} personaje
 * @returns {React.ReactElement} JSX element 
 */
 const BotonFavorito: FunctionComponent<{ personaje: Personaje }> = ({ personaje }) => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const favoritoMap = useSelector((state) => state.favoritos.favoritosMapa);
    const dispatch = useDispatch();
  
    const src = require(favoritoMap.has(personaje.id)
      ? "../../Assets/star-filled.png"
      : "../../Assets/star.png");
  
    /**
     * Función que actualiza el estado de favoritos, agrega o remueve el personaje
     * @param {event} event
     */
    const toggleFavoritos = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(toggleFavorito(personaje));
    };
  
    return (
      <button className="boton-favorito" onClick={toggleFavoritos} type="button">
        <img src={src} alt={"favorito"} />
      </button>
    );
  };
  
  export default BotonFavorito;
  