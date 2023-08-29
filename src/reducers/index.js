import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../hooks/http.hook";

const { request } = HttpRequest();
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filter: 'all'
};

const putDataHeroe = createAsyncThunk(
    'heroes/addHeroe',
    (heroe) => request("http://localhost:3000/heroes", 'POST',
        JSON.stringify(heroe)).then(() => heroe));

const getHeroes = createAsyncThunk(
    'heroes/Load',
    () => request("http://localhost:3000/heroes"))

const deleteHeroe = createAsyncThunk(
    'heroes/Delete',
    (id, {getState}) => { 
        const state = getState();
        
        return request(`http://localhost:3000/heroes/${id}`, 'DELETE')
        .then(() => ({
                    heroes: state.heroes.length !== 0 ?
                        state.heroes.filter((el) => el.id !== id)
                        :
                        [],
                    filter: state.filters.length !== 0 ?
                        state.filters.filter((el) => el.id !== id)
                        :
                        [],
                }))
    }
)

const slice = createSlice({
    name: 'heroeS',
    initialState,
    reducers: {
        filterHeroes: (state, { payload }) => {
            state.filters = payload === 'all' ?
            state.heroes
                :
            state.heroes.filter((el) => el.element === payload)

        },
        initFilter: (state, { payload }) => { state.filter = payload },   
    },
    extraReducers: (builder) => { 
        builder
            .addCase(putDataHeroe.fulfilled, (state, {payload}) => {
                state.heroes.push(payload);
                    state.filters = state.filter === 'all' ?
                        state.heroes :
                        state.heroes.filter((el) => el.element === state.filter)
            })
            .addCase(putDataHeroe.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(getHeroes.pending, (state, payload) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(getHeroes.fulfilled, (state, {payload}) => { 
                state.heroes = payload;
                state.filters = payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(deleteHeroe.fulfilled, (state, action) => {
                    state.heroes = action.payload.heroes;
                    state.filters = action.payload.filter;
                })
    }
});
const { reducer, actions } = slice;
const { initFilter,filterHeroes } = actions;
// dispatch(addHero(id))
// const addHero = (heroe) => (dispatch) => { 
//     request("http://localhost:3000/heroes", 'POST', JSON.stringify(heroe))
//         .then(() => { 
//             dispatch(addHeroe(heroe))
//         })
// };
// const heroesFetchingg = (dispatch) => { 
//     dispatch(heroesFetching());
//     request("http://localhost:3000/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))

// };
// const deleteHero = ({ id, state }) => (dispatch) => {
//     request(`http://localhost:3000/heroes/${id}`, 'DELETE')
//         .then((response) => console.log('response', response))
//         .then(() => dispatch(deleteHeroe({ id, state })))
 
// };
export {initialState,reducer,  initFilter, filterHeroes, putDataHeroe, getHeroes, deleteHeroe}

///



//Это просто абстрактное объяснение работы обертки создаваемой createAsyncThunk  ======>>>>
// const putDataHeroe = createAsyncThunk(
//     'heroes/addHeroe',
//     (heroe, { dispatch }) => request("http://localhost:3000/heroes", 'POST', JSON.stringify(heroe))
//         .then(() => heroe)// create AsyncThunk цепляет свои then  обработчки выполнения промиса
// //then((res) => dispatch({type: putData.fulfilled, payload: res})).catch((r) => )
//     //там соответсвенно будет больше логики,єто обстарктное представление
//     // .then(() => {
//     //    return dispatch(addHeroe(heroe))
//     // })
// )//<======

// const reducerObject = {
//     'HEROES_FETCHING': (state, payload ) => ({ ...state, heroesLoadingStatus: 'loading' }),
//     'HEROES_FETCHED':   (state,  payload ) => ({
//                 ...state,
//                 heroes: payload,
//                 filters: payload,
//                 heroesLoadingStatus: 'idle'
//     }),
//     'HEROES_FETCHING_ERROR': (state) => ({
//                 ...state,
//                 heroesLoadingStatus: 'error'
//     }),
//     'DELETE_HEROE': (state, payload) => ({
//         ...state,
//         heroes: payload.filter,
//         filters: payload.filter
//     }),
//     'FILTER': (state, payload ) => (
//         {
//             ...state,
//             filters: payload === 'all' ? state.heroes : state.heroes.filter((el) => el.element === payload)
//         }
//     ),
//     'ADD_HEROE': (state, payload) => {
//         console.log('add heroe')
//         const newListHeroe = [...state.heroes];
//         newListHeroe.push(payload);
//         return {
//             ...state,
//             heroes: newListHeroe,
//             filters: state.filter === 'all' ? newListHeroe : newListHeroe.filter((el) => el.element === state.filter)
//         }
//     },
     
//     'INIT_FILTER': (state, payload) => ({
//         ...state,
//             filter: payload
//     })
// }
// const reducer = (state, { type, payload }) => {
//     return reducerObject[type] ? reducerObject[type](state, payload) : state;
// }
// const HEROES_FETCHING = 'HEROES_FETCHING';
// export { reducer, initialState };
// const reducer = (state, { type, payload }) => {
    // switch (type) {
    //     case 'HEROES_FETCHING':
    //         return {
    //             ...state,
    //             heroesLoadingStatus: 'loading'
    //         }
    //     case 'HEROES_FETCHED':
    //         return {
    //             ...state,
    //             heroes: payload,
    //             filters: payload,
    //             heroesLoadingStatus: 'idle'
    //         }
    //     case 'HEROES_FETCHING_ERROR':
    //         return {
    //             ...state,
    //             heroesLoadingStatus: 'error'
    //         }
    //     case 'DELETE_HEROE':
    //         console.log('I am delete recuder in work')
    //         // const filteredAllElements = state.heroes.length !== 0 ?
    //         //     state.heroes.filter((el) => el.id !== payload)
    //         //     :
    //         //     [];
    //         // const filtered = state.filters.length !== 0 ?
    //         //     state.filters.filter((el) => el.id !== payload)
    //         //     :
    //         //     [];
    //         return {
    //             ...state,
    //             // heroes: filteredAllElements,
    //             // filters: filtered
    //             heroes: payload.filter,
    //             filters: payload.filter
    //         }
    //     case 'FILTER':
    //         return {
    //             ...state,
    //             filters: payload === 'all' ? state.heroes : state.heroes.filter((el) => el.element === payload)
    //         }
    //     case 'ADD_HEROE':
    //         console.log('add heroe')
    //         const newListHeroe = [...state.heroes];
    //         newListHeroe.push(payload);
    //         return {
    //             ...state,
    //             heroes: newListHeroe,
    //             filters: state.filter === 'all' ? newListHeroe : newListHeroe.filter((el) => el.element === state.filter)
    //         }
    //     case 'INIT_FILTER':
    //         return {
    //             ...state,
    //             filter: payload
    //         }
    //     default: return state
    // }
// }

