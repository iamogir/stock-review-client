import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../app/redux/store.ts";
import {deleteStockEntryByIdAsyncAction} from "../../actions/stockEntriesAsyncActions.ts";

interface Props {
    id: string;
}

const DeleteProductButton = ({id}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <button onClick={() => dispatch(deleteStockEntryByIdAsyncAction(id))}>Delete</button>
        </div>
    );
};

export default DeleteProductButton;