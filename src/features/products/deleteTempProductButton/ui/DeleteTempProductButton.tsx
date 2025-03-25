import React from 'react';
import {removeOneEntry} from "features/products";
import style from './deleteTempProductButton.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";

interface Props {
    index: number
}

export const DeleteTempProductButton = ({ index }: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    // console.log(index)

    return (
        <div>
            <button onClick={() => {
                // console.log(index)
                dispatch(removeOneEntry(index))
            }}>Delete</button>
        </div>
    );
};