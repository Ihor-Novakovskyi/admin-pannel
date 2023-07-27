import { createAction } from "@reduxjs/toolkit"
export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const deleteHeroe = (id) => (dispatch, state)  => {
// Делается обертка thunk,его нужно поставить в самом начале,по сути єто такой же мидлвар которій является первім єлеменото нашей композиции.Запускается наш thunk(как мы понимаем это наш наш первый action => {} - dispatch) в качестве аргумента получает {type: DO, payload: true} или метод.Если action - объект,то просто выполнятся наша цепочка конвеера,если же функция, то оставшейся конвеер midlewereThunk в метод который он получил в качестве агрумента action(next) - a next это же наш следуюшщий action из конвеера 
//И в этом action нужно обязательно запустить конвеер,иначе он не будет работать
    const { getState } = state;
    return dispatch({
        type: 'DELETE_HEROE',
        payload: {
                        heroes: getState().heroes.length !== 0 ?
                        getState().heroes.filter((el) => el.id !== id)
                        :
                            [],
                        filter: getState().filters.length !== 0 ?
                        getState().filters.filter((el) => el.id !== id)
                        :
                        [],
                    }})
}
export const filterHeroes = (filter) => { 
    return {type: 'FILTER', payload: filter}
}
export const addHeroe = (heroe) => ({ type: 'ADD_HEROE', payload: heroe });
export const initFilter = (filter) => ({ type: 'INIT_FILTER', payload: filter });
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