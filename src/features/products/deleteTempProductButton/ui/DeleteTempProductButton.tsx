import {removeOneEntry} from "features/products";
import style from './deleteTempProductButton.module.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";

interface Props {
    index: number
}

export const DeleteTempProductButton = ({ index }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <button className={style.color} onClick={() => {dispatch(removeOneEntry(index))}}>Delete</button>
    );
};