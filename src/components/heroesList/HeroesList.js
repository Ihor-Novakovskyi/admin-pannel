import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';

const HeroesList = () => {
    const { filters, heroesLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(heroesFetching);
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

const sliceIgor = createSlice({
    name: 'igor',
    initialState: {
        name: 'Igor',
        secondName: 'Novakovskiy',
        age: 36
    },
    reducers: {
        changeName: (state, action) => { state.name = action.payload },
        changeSecondName: (state, action) => { state.secondName = action.payload },
        changeAge: (state, action) => {state.age = action.payload }
    }
})
const sliceMila = createSlice({
    name: 'mila',
    initialState: {
        name: 'Igor',
        secondName: 'Novakovskiy',
        age: 36
    },
    reducers: {
        changeName: (state, action) => { state.name = action.payload },
        changeSecondName: (state, action) => { state.secondName = action.payload },
        changeAge: (state, action) => {state.age = action.payload }
    }
})

const { actions: igorActions, reducer: Igor } = sliceIgor;
const { actions: milaActions, reducer: Mila } = sliceMila;
// console.log('actions', actions, 'reducer', reducer);
const { changeAge, changeNamem, changeSecondName } = igorActions;
const store = configureStore({
    reducer: {Igor, Mila }
});
const { subscribe, getState, dispatch } = store;
console.log(getState());
subscribe(() => { 
    console.log(getState())
});

console.log(Igor);
dispatch(dispatch => { 
    setTimeout(() => dispatch(changeAge(32)), 3000)
})



