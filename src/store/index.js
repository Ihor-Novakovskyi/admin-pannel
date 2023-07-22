import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import {reducer, initialState} from '../reducers';

const firstMidleware = store => next => action => { 
    console.log('first MidleWare work')
    return next(action)
}

const secondMiddleware = store => next => action => { 
    console.log('second Middleware work');
    return next(action)
}

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [firstMidleware, secondMiddleware]
})
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default store;