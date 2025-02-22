import style from './addProductPage.module.css'
import {FormEvent } from "react";

const AddProductPage = () => {

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const infoObject = {};
        const form = document.querySelector("#addForm");
        console.log(event.target)
    }

    return (
        <div>
            <form id={"addForm"} className={style.form} onSubmit={addProduct}>
                <label>Name</label>
                <input name={'name'} />
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