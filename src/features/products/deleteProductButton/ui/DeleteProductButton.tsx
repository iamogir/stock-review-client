import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {deleteStockEntryByIdAsyncAction} from "features/products";
import {updateExpiredProducts} from "features/products";

interface Props {
    id: string;
}

export const DeleteProductButton = ({id}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = () => {
        dispatch(deleteStockEntryByIdAsyncAction(id));
            dispatch(updateExpiredProducts(id));
    }

    return (
        <div>
            <button onClick={func}>Delete</button>
        </div>
    );
};