import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {
    deleteStockEntryByIdAsyncAction,
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
        }
        if (id && entity === 'product') {
            dispatch(deleteProductByIdAsyncAction(id));
            dispatch(getAllStockEntriesAsyncAction());
        }
    }

    return (
        <div>
            <button onClick={func}>Delete</button>
            <button>DELETE WITH SELECT??</button>
        </div>
    );
};