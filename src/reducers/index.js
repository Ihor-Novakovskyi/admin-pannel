const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filter: 'all'
}

const reducer = (state, { type, payload }) => {
    console.log('first work reducer')
    switch (type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: payload,
                filters: payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HEROE':
            const filteredAllElements = state.heroes.length !== 0 ?
                state.heroes.filter((el) => el.id !== payload)
                :
                [];
            const filtered = state.filters.length !== 0 ?
                state.filters.filter((el) => el.id !== payload)
                :
                [];
            return {
                ...state,
                heroes: filteredAllElements,
                filters: filtered
            }
        case 'FILTER':
            return {
                ...state,
                filters: payload === 'all' ? state.heroes : state.heroes.filter((el) => el.element === payload)
            }
        case 'ADD_HEROE':
            const newListHeroe = [...state.heroes];
            newListHeroe.push(payload);
            return {
                ...state,
                heroes: newListHeroe,
                filters: payload === 'all' ? newListHeroe : newListHeroe.filter((el) => el.element === state.filter)
            }
        case 'INIT_FILTER':
            return {
                ...state,
                filter: payload
            }
        default: return state
    }
}

export { reducer, initialState };