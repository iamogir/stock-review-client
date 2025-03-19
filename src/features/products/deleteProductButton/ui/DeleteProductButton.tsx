import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {
    deleteStockEntryByIdAsyncAction,
    updateExpiringSoonProducts,
    deleteExpiredProduct,
    getAllStockEntriesAsyncAction,
    deleteProductByIdAsyncAction
} from "features/products";

interface Props {
    id: string | undefined;
    entity: string
}

export const DeleteProductButton = ({id, entity}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = () => {
        if (id && entity === 'entry') {
            dispatch(deleteStockEntryByIdAsyncAction(id));
            dispatch(deleteExpiredProduct(id));
            dispatch(updateExpiringSoonProducts(id));
        }
        if (id && entity === 'product') {
            dispatch(deleteProductByIdAsyncAction(id));
            dispatch(getAllStockEntriesAsyncAction());
        }
    }

    return (
        <div>
            <button onClick={func}>Delete</button>
        </div>
    );
};