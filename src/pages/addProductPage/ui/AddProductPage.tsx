import style from './addProductPage.module.css'
import {FormEvent} from "react";
import {fromServerProductObject, ProductDto} from "entities/product";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "app/redux";
import {useNavigate} from "react-router-dom";
import {statusUnits, weightUnits} from "shared/consts";
import {addNewProductsStackAsyncAction, addProduct, removeAllProducts, removeOneProduct} from "features/products";
import {DropMenu} from "shared/ui/dropMenu";
import {DeleteTempProductButton} from "features/products/deleteTempProductButton";
import {DeleteProductButton} from "features/products/deleteProductButton";

export const AddProductPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { newProducts } = useSelector((state: RootState) => state.addingProducts);

    const addNewProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        const infoObject: ProductDto = {
            name: eventTarget['productName'].value,
            brand: eventTarget['brand'].value,
            category: eventTarget['category'].value,
            unitWeight: eventTarget['unitWeight'].value,
            status: eventTarget['status'].value
        };

        dispatch(addProduct(fromServerProductObject(infoObject)));
    }

    const sentNewProducts = async() => {
        if (newProducts) {
            const temp = await dispatch(addNewProductsStackAsyncAction(newProducts));
            if (temp.type.includes('fulfilled')) //TODO request status remove
                dispatch(removeAllProducts());
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>

            <div>
                {newProducts && newProducts.map((item, index) => <li>{item.name} <DeleteProductButton key={index} index={index} deleteFunc={removeOneProduct} /></li>)}
            </div>

            <form className={style.form} onSubmit={addNewProduct}> {/*novalidate - disable browser validation*/}

                <label htmlFor={'productName'}>Name</label>
                <input type={'text'} id={'productName'} name={'productName'} />

                <label htmlFor={'brand'}>Brand</label>
                <input type={'text'} id={'brand'} name={'brand'} />

                <label htmlFor={'category'}>Category</label>
                <input type={'text'} id={'category'} name={'category'} />

                <label htmlFor={'unitWeight'}>Unit of the weight</label>
                <DropMenu inputId={'unitWeight'} variables={weightUnits ?? []} unit={'key'} value={'value'}/>

                <label htmlFor={'status'}>Status</label>
                <DropMenu inputId={'status'} variables={statusUnits ?? []} unit={'key'} value={'value'}/>

                <br/>
                <button>
                    <span>Add product</span>
                    <input type="submit" style={{display: 'none'}}/>
                </button>
            </form>
            <button onClick={sentNewProducts}>SEND</button>

        </div>
    );
};