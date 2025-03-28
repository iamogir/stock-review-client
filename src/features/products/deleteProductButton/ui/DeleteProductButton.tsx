import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {ActionCreatorWithPayload, AsyncThunk, isAsyncThunkAction} from "@reduxjs/toolkit";

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
            alert('Were deleted: \n' + "product: " + name + '\nand ' + response.payload?.count + ' entries of supply');
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