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

    const func = async () => {
        if (isAsyncThunkAction(deleteFunc)) {
            const temp = await dispatch(deleteFunc(index as never));
            alert('Were deleted ' + temp.payload.id + ' and ' + temp.payload.count + ' entries of supply');
            // console.log(temp.payload?.(count as number) + ' TEMP');
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