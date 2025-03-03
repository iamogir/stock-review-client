import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../app/redux/store.ts";

interface Props {
    id: string | undefined;
}

const DeleteProductButton = ({id}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <button onClick={dispatch(deleteProductByIdAsyncAction(id))}>Delete</button>
        </div>
    );
};

export default DeleteProductButton;