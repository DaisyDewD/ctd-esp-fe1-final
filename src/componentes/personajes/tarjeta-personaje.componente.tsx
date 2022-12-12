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
     * Function that redirect the user to the detail page when clicks on the character image
     */
    const redirectToDetailPage = () => {
      navigate(`/detail/${personaje.id}`, { state: { personaje: personaje } });
    };
  
    return (
      <div className="tarjeta-personaje">
        <img
          src={personaje.image}
          onClick={redirectToDetailPage}
          alt={personaje.name}
        />
        <div className="card-personaje-body">
          <span>{personaje.name}</span>
          <BotonFavorito personaje={personaje} />
        </div>
      </div>
    );
  };
  
  export default TarjetaPersonaje;