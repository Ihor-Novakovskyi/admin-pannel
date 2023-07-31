



const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filter: 'all'
};
const reducerObject = {
    'HEROES_FETCHING': (state, payload ) => ({ ...state, heroesLoadingStatus: 'loading' }),
    'HEROES_FETCHED':   (state,  payload ) => ({
                ...state,
                heroes: payload,
                filters: payload,
                heroesLoadingStatus: 'idle'
    }),
    'HEROES_FETCHING_ERROR': (state) => ({
                ...state,
                heroesLoadingStatus: 'error'
    }),
    'DELETE_HEROE': (state, payload) => ({
        ...state,
        heroes: payload.filter,
        filters: payload.filter
    }),
    'FILTER': (state, payload ) => (
        {
            ...state,
            filters: payload === 'all' ? state.heroes : state.heroes.filter((el) => el.element === payload)
        }
    ),
    'ADD_HEROE': (state, payload) => {
        console.log('add heroe')
        const newListHeroe = [...state.heroes];
        newListHeroe.push(payload);
        return {
            ...state,
            heroes: newListHeroe,
            filters: state.filter === 'all' ? newListHeroe : newListHeroe.filter((el) => el.element === state.filter)
        }
    },
     
    'INIT_FILTER': (state, payload) => ({
        ...state,
            filter: payload
    })
}
const reducer = (state, { type, payload }) => {
    console.log('first work reducer')
    return reducerObject[type] ? reducerObject[type](state, payload) : state;
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
}

export { reducer, initialState };
