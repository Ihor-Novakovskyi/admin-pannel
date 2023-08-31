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
export { initialState, reducer, initFilter, filterHeroes, putDataHeroe, getHeroes, deleteHeroe };





