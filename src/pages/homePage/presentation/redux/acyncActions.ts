import {ResponseProducts} from "./types.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllProductsAsyncAction = createAsyncThunk<ResponseProducts>(
    'home/get_all_products',
    async() => {
        const {getAllProducts} = useUseCases();
        try {
            return await getAllProducts();
        } catch (error) {
            throw error;
        }
    }
)