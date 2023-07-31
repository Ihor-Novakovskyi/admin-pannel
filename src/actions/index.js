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



// function func(a , b) { 
//     console.log(a + b)
// }
// const objrct = {
//     [func]: 5
// };
// console.log(objrct)
// const keys = Object.keys(objrct);
// console.log(keys)
// const startIndArg = keys[0].split('').indexOf('(');
// const endIndArg2 = keys[0].split('').indexOf(')');
// const arguments1 = keys[0].slice(startIndArg + 1, endIndArg2);
// const startBody = keys[0].split('').indexOf('{') + 1;
// const endBody = keys[0].split('').indexOf('}');
// const body = keys[0].slice(startBody, endBody);
// console.log(body);
// console.log(arguments1);

// const functio = new Function(keys[0]);
// console.log(functio())
// const func2 = new Function('...args', 'console.log(...args)')
// console.log(func2(1, 2, 3, 4))
// const funcParse = new Function(arguments1, body);
// console.dir(funcParse)
// funcParse(2, 5)
// export const deleteHeroe = ({ state, id }) => (dispatch) => { 
//     const action = createAction('DELETE_HEROE', ({ id, state }) => {
//         console.log('STATE',dispatch)
//         return {
//             payload:   {
//                 heroes: state.heroes.length !== 0 ?
//                     state.heroes.filter((el) => el.id !== id)
//                     :
//                     [],
//                 filter: state.filters.length !== 0 ?
//                     state.filters.filter((el) => el.id !== id)
//                     :
//                     [],
//             }
//         }
        
//     });
//     return dispatch(action({id,state}))
// }