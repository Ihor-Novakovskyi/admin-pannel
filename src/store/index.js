import { configureStore } from '@reduxjs/toolkit';
import {reducer, initialState} from '../reducers';

const store = configureStore({reducer,preloadedState: initialState }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// 
export default store;