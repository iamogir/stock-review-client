import style from './deleteTempProductButton.module.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface Props<T extends string | number> {
    index: T,
    deleteFunc: ActionCreatorWithPayload<T>;
}

export const DeleteTempProductButton = <T extends string | number>({ index, deleteFunc }: Props<T>) => {

    const dispatch = useDispatch<AppDispatch>();

    const temp = () => {
        dispatch(deleteFunc(index));
    }

    return (
        <button className={style.color} onClick={temp}>Delete</button>
    );
};