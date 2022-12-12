import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { FunctionComponent } from "react";
import Personaje from '../../types/personaje.types';
import { useNavigate } from 'react-router-dom';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * @param {Personaje} personaje
 * @returns {React.ReactElement} JSX elementun JSX element 
 */

 const TarjetaPersonaje: FunctionComponent<{ personaje: Personaje }> = ({ personaje }) => {
    let navigate = useNavigate();
  
    /**
     * Función que dirige al usuario a la pagina de detalle cuando da click en la imagen del personaje
     */
    const directToPaginaDetalle = () => {
      navigate(`/detalle/${personaje.id}`, { state: { personaje: personaje } });
    };
  
    return (
      <div className="tarjeta-personaje">
        <img
          src={personaje.image}
          onClick={directToPaginaDetalle}
          alt={personaje.name}
        />
        <div className="tarjeta-personaje-body">
          <span>{personaje.name}</span>
          <BotonFavorito personaje={personaje} />
        </div>
      </div>
    );
  };
  
  export default TarjetaPersonaje;