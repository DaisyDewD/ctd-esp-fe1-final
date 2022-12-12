import './filtros.css';
import { ChangeEvent, FunctionComponent } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector,} from "react-redux";
import { fetchPersonajesThunk } from "../../actions/personajes.actions";
import { IRootState } from "../../redux/store";

/**
 * Componente filtrar personajes
 *
 * @returns {React.ReactElement} JSX element
 */
 const Filtros: FunctionComponent = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const query = useSelector((state) => state.personajes.query);
    const dispatch = useDispatch();
  
    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
      let query = e.target.value;
      dispatch(fetchPersonajesThunk(query));
    };
  
    return (
      <div className="filtros">
        <label htmlFor="filtro">Filtrar por nombre:</label>
        <input
          type="text"
          placeholder="Rick, Morty, Scary, Snake, Mr. Meeseeks, etc..."
          onChange={onChange}
          value={query}
          name="filtros"
          autoFocus={true}
        />
      </div>
    );
  };
  
  export default Filtros;