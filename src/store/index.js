import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import {reducer, initialState} from '../reducers';
import thunk from 'redux-thunk';
import { reducer, initialState } from '../reducers';


export const firstMidleware = store => next => action => { 
    // const { type, payload } = action;
    // console.log('first MidleWare work')
    // console.log('store',store.getState())
    // if (type === 'DELETE_HEROE') { 

    //     const c = {
    //         type,
    //         payload: {
    //             heroes: store.getState().heroes.length !== 0 ?
    //             store.getState().heroes.filter((el) => el.id !== payload)
    //             :
    //                 [],
    //             filter: store.getState().filters.length !== 0 ?
    //             store.getState().filters.filter((el) => el.id !== payload)
    //             :
    //             [],
    //         }
    //     }
    //     console.log('cccccccccc', c)
    //     return next(c)
    // }
    console.log('nnnneeexxxxt', next)
    return next(action)
}

const secondMiddleware = store => next => action => { 
    console.log('second Middleware work', action);
    return next(action)
}
// Как бы я реализовал метод thunk. Этот метод является самым первым методом в конвеерре по цепочке запуска dispatch. Он готов
//принять метод в аргумент action и если єто функция передать себя же в качестве аргумена запустив функцию из аргумента action
//actionDO это как бы наш dispath из store. Последний же метод в цепочку мидлваров содержит родной dispath, который изменит state в store
//actionDO содержит рекурсивный запуск,пока в качестве аргумента не вернется объект. Как раз thunk и используют в асинхронном функционале,
// для того чтоб прирвать цепочку конвеера,а потом ее запустить при асинхронной операции.
function thunkMidleware(store, arg) { 
    return function next(next, arg) { 
        return function actionDO(action, arg) { 
            if (typeof action === 'function') { 
                return action(actionDO,store)
            }
           return next(action)
        }
    }
}
 
const store = configureStore({
    reducer,
    middleware: [thunk]
})
export default store;