import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {ActionCreatorWithPayload, AsyncThunk, isAsyncThunkAction} from "@reduxjs/toolkit";
import {DeletedProductData} from "entities/product";

type AppAsyncThunk = AsyncThunk<string, string, { rejectValue: string }>;

type Props =
    {
        name: string,
        index: number,
        deleteFunc: ActionCreatorWithPayload<number> | AppAsyncThunk
    }
    | {
        name: string,
        index: string,
        deleteFunc: AppAsyncThunk;
    }

export const DeleteProductButton = ({name, index, deleteFunc}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = async () => {
        if (isAsyncThunkAction(deleteFunc)) {
            const response = await dispatch(deleteFunc(index as never));
            const payload = response.payload as unknown as DeletedProductData;
            alert('Were deleted: \n' + "product: " + name + '\nand ' + payload + ' entries of supply');
        } else {
            dispatch(deleteFunc(index as never));
        }
    };

    return (
        <div>
            <button onClick={func}>Delete</button>
            <button>DELETE WITH SELECT??</button>
        </div>
    );
};