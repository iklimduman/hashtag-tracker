import { createSlice, current } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const countrySlice = createSlice({
    name : "country",
    initialState : {
        countryName : "",
        trends : []
    },
    reducers : {
        changeCountry : (state,action) => {
            state.countryName = action.payload.CountryName ;
        },
        addTrend : (state,action) => {
            state.trends.push(action.payload) ;
        },
        resetCountry : (state) => {
            state.countryName = "";
            state.trends = [] ;
        }
    }
}) ;

export const { changeCountry, addTrend, resetCountry } = countrySlice.actions;
export default countrySlice.reducer ;