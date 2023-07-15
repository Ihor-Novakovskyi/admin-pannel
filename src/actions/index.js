export const heroesFetching = () => {
    console.log('fetchind')
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    console.log('fetched')
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const deleteHeroe = (id) => {
    return {type: 'DELETE_HEROE', payload: id }
} 
export const filterHeroes = (filter) => { 
    return {type: 'FILTER', payload: filter}
}

export const addHeroe = (heroe) => ({ type: 'ADD_HEROE', payload: heroe });