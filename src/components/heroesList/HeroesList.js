import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { heroesFetchingg,  } from '../../reducers';

const HeroesList = () => {
    const { filters, heroesLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(heroesFetchingg);
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={ id } { ...props } id={id}  />
        })
    }

    const elements = renderHeroesList(filters);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;



