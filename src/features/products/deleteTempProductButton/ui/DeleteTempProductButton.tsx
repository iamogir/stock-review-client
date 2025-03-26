import {
    removeOneEntry,
    removeOneProduct
} from "features/products";
import style from './deleteTempProductButton.module.css'
import {AppDispatch} from "app/redux";
import {useDispatch} from "react-redux";

interface Props {
    index: number,
    entity: string
}

export const DeleteTempProductButton = ({ index, entity }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = () => {
        if (entity === 'entry') {
            dispatch(removeOneEntry(index));
        }
        if (entity === 'product') {
            dispatch(removeOneProduct(index));
        }
    }

    return (
        <button className={style.color} onClick={func}>Delete</button>
    );
};