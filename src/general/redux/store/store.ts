import {configureStore} from "@reduxjs/toolkit";
import homePageReducer from '../../../pages/homePage/presentation/redux/homePageSlice.ts'

export const store = configureStore({
    reducer: {
        homePage: homePageReducer
    }
})