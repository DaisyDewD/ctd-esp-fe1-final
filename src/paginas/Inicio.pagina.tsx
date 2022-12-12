import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { fetchPersonajesThunk } from "../actions/personajes.actions";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns {React.ReactElement} JSX element la pagina de inicio
 */
 const PaginaIncio: FunctionComponent = () => {
    const dispatch = useDispatch();
  
    /**
     * Función que remueve los filtros
     */
    const borrarFiltrosOnClick = () => {
      dispatch(fetchPersonajesThunk(""));
    };
  
    return (
      <div className="container">
        <div className="actions">
          <h3>Catálogo de Personajes</h3>
          <button className="danger" onClick={borrarFiltrosOnClick}>
            Limpiar filtros
          </button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
      </div>
    );
  };
  
  export default PaginaIncio;
  