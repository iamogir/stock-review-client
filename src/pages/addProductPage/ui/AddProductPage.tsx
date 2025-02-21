import style from './addProductPage.module.css'

const AddProductPage = () => {
    return (
        <div>
            <form className={style.form}>
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
            </form>
        </div>
    );
};

export default AddProductPage;