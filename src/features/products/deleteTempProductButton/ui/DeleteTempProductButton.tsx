import React from 'react';
import {removeOneEntry} from "features/products";
import style from './deleteTempProductButton.css'

interface Props {
    index: number
}

export const DeleteTempProductButton = ({ number }: Props) => {
    return (
        <div>
            <button onClick={() => dispatch(removeOneEntry(number))}>Delete</button>
        </div>
    );
};