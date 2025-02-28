import style from './addProductPage.module.css'
import {FormEvent } from "react";
import {Product} from "../../../entities/product/model/types.ts";
import {useDispatch} from "react-redux";
import {addNewProductAsyncAction} from "../../../features/products/productsAsyncActions.ts";
import {AppDispatch} from "../../../app/redux/store.ts";
import {useNavigate} from "react-router-dom";
import {weightUnits} from "../../../shared/consts/product.ts";

const AddProductPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        const infoObject: Product = {
            name: eventTarget['productName'].value,
            category: eventTarget['category'].value,
            weight: eventTarget['weight'].value,
            unitWeight: eventTarget['unitWeight'].value,
            quantityUnits: eventTarget['quantity'].value,
            expirationDate: new Date(eventTarget['expDate'].value),
            supplier: eventTarget['supplier'].value,
            storageLocation: eventTarget['location'].value,
            status: eventTarget['status'].value,
        };

        console.log(eventTarget['expDate'].value);

        dispatch(addNewProductAsyncAction(infoObject));
    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>
            <form className={style.form} onSubmit={addProduct}> {/*novalidate - disable browser validation*/}

                <label>Name</label>
                <input type={'text'} name={'productName'} />
                <label>Category</label>
                <input type={'text'} name={'category'} />
                <label>Weight</label>
                <input type={'hidden'} name={'weight'} />
                <div className={style.dropMenu}>
                    {weightUnits.map(unit => <div key={unit.key} data-unit={unit.key}>{unit.value}</div>)}
                </div>
                <label>Unit of thw weight</label>
                <input name={'unitWeight'} />
                <label>Quantity units</label>
                <input name={'quantity'} />
                <label>Best before:</label>
                <input name={'expDate'} type="date" />
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