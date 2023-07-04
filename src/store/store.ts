import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice"
import homeReducer from "../slices/homeSlice"
import authReducer from "../slices/authSlice";
import workReducer from "../slices/workSlice"
import contactReducer from "../slices/contactSlice"

const store = configureStore({
    reducer:{
        product:productReducer,
        home:homeReducer,
        auth:authReducer,
        work:workReducer,
        contact:contactReducer
    },
})


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch