import style from './deleteTempProductButton.module.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";
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
//TODO COMPONENT IN RESERVATION!!!
export const DeleteTempProductButton = ({ index, deleteFunc }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = () => {
        if (isAsyncThunkAction(deleteFunc)) {
            dispatch(deleteFunc(index as never));
        } else {
            dispatch(deleteFunc(index as never));
        }
    };

    return (
        <button className={style.color} onClick={func}>Delete</button>

    );
};