
import { useDispatch, useSelector } from "react-redux";
import { initFilter, filterHeroes } from "../../reducers";
const HeroesFilters = () => {
    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.filter);    
    const initialFilter = (e) => {
        const filter = e.target.getAttribute('data-action')
        if (filter !== activeFilter) {
            dispatch(initFilter(filter))
            if (filter === 'all') dispatch(filterHeroes(filter))
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={ initialFilter } data-action='all' className={ `btn btn-outline-dark ${activeFilter === 'all' ? 'active' : ''}` }>All</button>
                    <button onClick={ initialFilter } data-action='fire' className={ `btn btn-danger ${activeFilter === 'fire' ? 'active' : ''}` }>Fire</button>
                    <button onClick={ initialFilter } data-action='water' className={ `btn btn-primary ${activeFilter === 'water' ? 'active' : ''}` }>Water</button>
                    <button onClick={ initialFilter } data-action='wind' className={ `btn btn-success ${activeFilter === 'wind' ? 'active' : ''}` }>Wind</button>
                    <button onClick={ initialFilter } data-action='earth' className={ `btn btn-secondary ${activeFilter === 'earth' ? 'active' : ''}` }>Earth</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;



