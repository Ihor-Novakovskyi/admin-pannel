
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
import { initFilter, filterHeroes } from "../../actions";
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
                    <button onClick={ initialFilter } data-action='all' className={ `btn btn-outline-dark ${activeFilter === 'all' ? 'active' : ''}` }>Все</button>
                    <button onClick={ initialFilter } data-action='fire' className={ `btn btn-danger ${activeFilter === 'fire' ? 'active' : ''}` }>Огонь</button>
                    <button onClick={ initialFilter } data-action='water' className={ `btn btn-primary ${activeFilter === 'water' ? 'active' : ''}` }>Вода</button>
                    <button onClick={ initialFilter } data-action='wind' className={ `btn btn-success ${activeFilter === 'wind' ? 'active' : ''}` }>Ветер</button>
                    <button onClick={ initialFilter } data-action='earth' className={ `btn btn-secondary ${activeFilter === 'earth' ? 'active' : ''}` }>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;



