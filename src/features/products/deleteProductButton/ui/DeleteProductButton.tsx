import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {deleteStockEntryByIdAsyncAction} from "features/products";

interface Props {
    id: string;
}

export const DeleteProductButton = ({id}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <button onClick={() => dispatch(deleteStockEntryByIdAsyncAction(id))}>Delete</button>
        </div>
    );
};