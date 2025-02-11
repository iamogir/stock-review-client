import {ResponseProducts} from "./types.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllProductsAsyncAction = createAsyncThunk<ResponseProducts>(
    'home/get_all_products',
    async(): Promise<ResponseProducts> => {
       const {getPr} = getAllPr();
        try {
            return await getPr();
        } 
        catch (error) {
            throw error;
        }
    }
)

type ExRepT = {
    exRep: Pr
}



function locUseCases(){
    let exRep : ExRepT;
    exRep = new Pr();
    return {
        getAlPr: GetAllPr(exRep.exRep),
    }
}

const getAllPr(exRep) => async (): Promise<ResponseProducts> => {
    let response = await
}

interface Pr {
    getPr: () => Promise<ResponseProducts>;

}