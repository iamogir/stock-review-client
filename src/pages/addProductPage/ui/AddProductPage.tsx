import style from './addProductPage.module.css'
import {FormEvent } from "react";
import {Product} from "../../../entities/product/model/types.ts";
import {useDispatch} from "react-redux";
import {addNewProductAsyncAction} from "../../../features/products/productsAsyncActions.ts";
import {AppDispatch} from "../../../app/redux/store.ts";

const AddProductPage = () => {

    const dispatch = useDispatch<AppDispatch>();

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        const infoObject: Product = {
            name: eventTarget['productName'].value,
            category: eventTarget['category'].value,
            weight: eventTarget['weight'].value,
            unitWeight: eventTarget['unitWeight'].value,
            quantityUnits: eventTarget['quantity'].value,
            expirationDate: eventTarget['expDate'].value,
            supplier: eventTarget['supplier'].value,
            storageLocation: eventTarget['location'].value,
            status: eventTarget['status'].value,
        };

        console.log(infoObject);

        dispatch(addNewProductAsyncAction(infoObject));
    }

    return (
        <div>
            <form className={style.form} onSubmit={addProduct}> {/*novalidate - disable browser validation*/}

                <label>Name</label>
                <input name={'productName'} />
                <label>Category</label>
                <input name={'category'} />
                <label>Weight</label>
                <input name={'weight'} />
                <label>Unit of thw weight</label>
                <input name={'unitWeight'} />
                <label>Quantity units</label>
                <input name={'quantity'} />
                <label>Best before:</label>
                <input name={'expDate'} />
                <label>Barcode</label>
                <input name={'barcode'} />
                <label>Supplier</label>
                <input name={'supplier'} />
                <label>Location</label>
                <input name={'location'} />
                <label>Status</label>
                <input name={'status'} />
                <input type="submit" value="Add product" />
            </form>

        </div>
    );
};

export default AddProductPage;