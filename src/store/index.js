import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import thunk from '../myThunkRealisation'; 
import { reducer, initialState } from '../reducers';


 
const store = configureStore({
    reducer,
    middleware: [thunk]
})
export default store;