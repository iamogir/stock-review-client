import style from './addNewSupplyPage.module.css'
import {useNavigate} from "react-router-dom";
import {FormEvent} from "react";
import {fromServerStockEntryObject, StockEntryDto} from "entities/stockEntry";
import { addEntry, removeAllEntries } from "features/products";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "app/redux";
import {DropMenu} from "shared/ui/dropMenu";
import {addNewEntriesStackAsyncAction} from "features/products/actions/stockEntriesAsyncActions.ts";
import {DeleteTempProductButton} from "features/products/deleteTempProductButton";

export const AddNewSupplyPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const { newEntries } = useSelector((state: RootState) => state.addingProducts);

    const addSupply = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        console.log(eventTarget['type'].value)
        const infoObject: StockEntryDto = {
            productId: eventTarget['type'].value, //TODO: adding product!
            weight: eventTarget['weight'].value,
            quantityUnits: eventTarget['quantity'].value,
            expirationDate: eventTarget['expDate'].value,
            supplier: eventTarget['supplier'].value,
            storageLocation: eventTarget['location'].value,
        };

        const barcode = eventTarget['barcode'].value;
        if (barcode && barcode.length > 0 && barcode !== '')
            infoObject.barcode = barcode;

        if (products) {
            const object = fromServerStockEntryObject(infoObject, products);
            dispatch(addEntry(object));
        }
    }

    const sentNewSupplies = async() => {
        if (newEntries) {
            const temp = await dispatch(addNewEntriesStackAsyncAction(newEntries)); //TODO request status remove
            if (temp.type.includes('fulfilled'))
                dispatch(removeAllEntries());
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>

            <div>
                {newEntries && newEntries.map((item, index) => <li>{item.productInfo?.name} <DeleteTempProductButton key={index} index={index} /></li>)}
            </div>

            <form className={style.form} onSubmit={addSupply}>

                <label htmlFor={'type'}>Type of product</label>
                <DropMenu inputId={'type'} variables={products ?? []} unit={'id'} value={'name'}/>

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
            <button onClick={sentNewSupplies}>SEND</button>

        </div>
    );
};