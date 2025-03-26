import style from './deleteTempProductButton.module.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface Props {
    index: number,
    deleteFunc: ActionCreatorWithPayload<number>;
}

export const DeleteTempProductButton = ({ index, deleteFunc }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <button className={style.color} onClick={() => dispatch(deleteFunc(index))}>Delete</button>

    );
};