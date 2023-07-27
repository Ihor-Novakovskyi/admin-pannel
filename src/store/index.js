import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import {reducer, initialState} from '../reducers';
import thunk from 'redux-thunk';


const firstMidleware = store => next => action => { 
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
   
    return next(action)
}

const secondMiddleware = store => next => action => { 
    console.log('second Middleware work', action);
    return next(action)
}

function thunkMidleware(store) { 
    return function next (next) { 
        return function action(action) { 
            if (typeof action === 'function') { 
                return action(next, store)
            }
           return next(action)
        }
    }
}

const store = configureStore({
    reducer,
    preloadedState: initialState,
    // middleware: defaultMidleware => defaultMidleware().concat(firstMidleware, secondMiddleware)
    middleware: [thunkMidleware,firstMidleware, secondMiddleware]
})
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default store;