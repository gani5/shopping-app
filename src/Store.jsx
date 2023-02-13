import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";

export const Store=configureStore({
    reducer:{
        CartReducer:CartReducer
    }
})