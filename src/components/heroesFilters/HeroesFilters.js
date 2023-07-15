
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch } from "react-redux";
import { useState, useEffect} from "react";
import { filterHeroes } from "../../actions";
const HeroesFilters = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState('all');
    const initFilter = (e) => { 
        console.log(e.target.getAttribute('data-action'))
        setActive(e.target.getAttribute('data-action'))
        dispatch(filterHeroes(e.target.getAttribute('data-action').trim()))
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={initFilter} data-action='all' className={`btn btn-outline-dark ${active === 'all' ? 'active' : ''}`}>Все</button>
                    <button onClick={initFilter} data-action='fire' className={ `btn btn-danger ${active === 'fire' ? 'active' : ''}`}>Огонь</button>
                    <button onClick={initFilter} data-action='water' className={ `btn btn-primary ${active === 'water' ? 'active' : ''}` }>Вода</button>
                    <button onClick={initFilter} data-action='wind' className={`btn btn-success ${active === 'wind' ? 'active' : ''}`}>Ветер</button>
                    <button onClick={initFilter} data-action='earth' className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;