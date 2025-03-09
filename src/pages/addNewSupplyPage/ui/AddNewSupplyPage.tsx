import style from './addNewSupplyPage.module.css'
import {useNavigate} from "react-router-dom";
import {FormEvent} from "react";
import { StockEntry} from "../../../entities/product/model/types.ts";
import {addNewStockEntryAsyncAction} from "../../../features/products/actions/stockEntriesAsyncActions.ts";
import {useDispatch} from "react-redux";

const AddNewSupplyPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addSupply = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        const infoObject: StockEntry = {
            productInfo: eventTarget['type'].value, //TODO: adding product!
            weight: eventTarget['weight'].value,
            quantityUnits: eventTarget['quantity'].value,
            expirationDate: eventTarget['expDate'].value,
            supplier: eventTarget['supplier'].value,
            storageLocation: eventTarget['location'].value,
        };

        const barcode = eventTarget['barcode'].value;
        if (barcode && barcode.length > 0 && barcode !== '')
            infoObject.barcode = barcode;

        console.log(eventTarget['expDate'].value);

        dispatch(addNewStockEntryAsyncAction(infoObject));
    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>

            <form className={style.form} onSubmit={addSupply}>

                <label htmlFor={'type'}>Type og product</label>
                <input type={'hidden'} id={'type'} name={'type'}/>

                <label htmlFor={'weight'}>Weight</label>
                <input type={'number'} min={0} id={'weight'} name={'weight'} />
                <label htmlFor={'quantity'}>Quantity units</label>
                <input type={'number'} min={0} id={'quantity'} name={'quantity'} />
                <label htmlFor={'expDate'}>Best before:</label>
                <input type={'date'} id={'expDate'} name={'expDate'} />
                <label htmlFor={'barcode'}>Barcode</label>
                <input type={'number'} min={100000000000} id={'barcode'} name={'barcode'} />
                <label htmlFor={'supplier'}>Supplier</label>
                <input type={'text'} id={'supplier'} name={'supplier'} />
                <label htmlFor={'location'}>Location</label>
                <input type={'text'} id={'location'} name={'location'} />

                <button>
                    <span>Add product</span>
                    <input type="submit" style={{display: 'none'}}/>
                </button>
            </form>

        </div>
    );
};

export default AddNewSupplyPage;