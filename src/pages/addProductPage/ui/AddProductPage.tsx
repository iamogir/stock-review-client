import style from './addProductPage.module.css'
import {FormEvent } from "react";
import {Product} from "../../../entities/product/model/types.ts";

const AddProductPage = () => {

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        console.log(event)
        const infoObject: Product = {
            id: '0',
            name: eventTarget['namee'].value,
            category: eventTarget['category'].value,
            weight: eventTarget['weight'].value,
            unitWeight: eventTarget['unit'].value,
            quantityUnits: 1,
            expirationDate: new Date(Date.now()),
            supplier: eventTarget['supplier'].value,
            storageLocation: eventTarget['location'].value,
            status: eventTarget['status'].value,
        };

        console.log(infoObject);
    }

    return (
        <div>
            <form className={style.form} onSubmit={addProduct}> {/*novalidate - disable browser validation*/}
                <label>Name</label>
                <input name={'namee'} />
                <label>Category</label>
                <input name={'category'} />
                <label>Weight</label>
                <input name={'weight'} />
                <label>Unit</label>
                <input name={'unit'} />
                <label>Exp date</label>
                <input name={'expDate'} />
                <label>Barcode</label>
                <input name={'barcode'} />
                <label>Supplier</label>
                <input name={'supplier'} />
                <label>Price</label>
                <input name={'price'} />
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