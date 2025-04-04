import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {ActionCreatorWithPayload, AsyncThunk, isAsyncThunkAction} from "@reduxjs/toolkit";
import {DeletedProductData} from "entities/product";

type AppAsyncThunk = AsyncThunk<string, string, { rejectValue: string }>;

type Props =
    {
        name: string,
        index: number,
        deleteFunc: ActionCreatorWithPayload<number> | AppAsyncThunk
    }
    | {
        name: string,
        index: string,
        deleteFunc: AppAsyncThunk;
    }

export const DeleteProductButton = ({name, index, deleteFunc}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const func = async () => {
        if (isAsyncThunkAction(deleteFunc)) {
            const answer = confirm('Are you sure?');
            if (answer) {
                await dispatch(deleteFunc(index as never));
                alert('Was deleted product: ' + name);
            }
        } else {
            dispatch(deleteFunc(index as never));
        }
    };

    return (
        <div>
            <button onClick={func}>Delete</button>
            <button>DELETE WITH SELECT??</button>
        </div>
    );
};