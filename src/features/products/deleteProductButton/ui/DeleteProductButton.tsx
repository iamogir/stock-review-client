import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../app/redux/store.ts";
import {deleteProductByIdAsyncAction} from "../../actions/productsAsyncActions.ts";

interface Props {
    id: string;
}

const DeleteProductButton = ({id}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <button onClick={() =>dispatch(deleteProductByIdAsyncAction(id))}>Delete</button>
        </div>
    );
};

export default DeleteProductButton;