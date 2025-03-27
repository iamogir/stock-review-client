import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {ActionCreatorWithPayload, AsyncThunk, isAsyncThunkAction} from "@reduxjs/toolkit";

type AppAsyncThunk = AsyncThunk<string, string, { rejectValue: string }>;

type Props =
    {
        index: number,
        deleteFunc: ActionCreatorWithPayload<number> | AppAsyncThunk
    }
    | {
        index: string,
        deleteFunc: AppAsyncThunk;
    }

export const DeleteProductButton = ({index, deleteFunc}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = () => {
        if (isAsyncThunkAction(deleteFunc)) {
            dispatch(deleteFunc(index as never));
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