import { createAction } from "@reduxjs/toolkit";
import { firstMidleware } from "../store";
import { HttpRequest } from "../hooks/http.hook";

const { request } = HttpRequest();

export const heroesFetching = (dispatch) => { 
    dispatch(createAction('HEROES_FETCHING')());
    request("http://localhost:3000/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

};
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
export const deleteHeroe = ({ id, state }) => (dispatch) => { 
   const deleteHeroe = createAction('DELETE_HEROE', ({ id, state }) => {
        return {
            payload:   {
                heroes: state.heroes.length !== 0 ?
                    state.heroes.filter((el) => el.id !== id)
                    :
                    [],
                filter: state.filters.length !== 0 ?
                    state.filters.filter((el) => el.id !== id)
                    :
                    [],
            }
        }
   })
    request(`http://localhost:3000/heroes/${id}`, 'DELETE')
        .then((response) => console.log('response',response))
        .then(() => dispatch(deleteHeroe({ id, state })))

};


export const filterHeroes = createAction('FILTER')
export const addHeroe = (heroe) => (dispatch) => dispatch((dispatch) => dispatch((dispatch) => { 
    request("http://localhost:3000/heroes", 'POST', JSON.stringify(heroe))
        .then(() => { 
            const action = createAction('ADD_HEROE')
            dispatch(action(heroe))
        })
}));
export const initFilter = createAction('INIT_FILTER');



