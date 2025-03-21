import style from './addProductPage.module.css'
import {FormEvent} from "react";
import {ProductDto} from "entities/product";
import {useDispatch} from "react-redux";
import {AppDispatch} from "app/redux";
import {useNavigate} from "react-router-dom";
import {statusUnits, weightUnits} from "shared/consts";
import {addNewProductAsyncAction} from "features/products";
import {DropMenu} from "shared/ui/dropMenu";

export const AddProductPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const eventTarget = event.target as HTMLFormElement;
        const infoObject: ProductDto = {
            name: eventTarget['productName'].value,
            brand: eventTarget['brand'].value,
            category: eventTarget['category'].value,
            unitWeight: eventTarget['unitWeight'].value,
            status: eventTarget['status'].value
        };

        dispatch(addNewProductAsyncAction(infoObject));
    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>
            <form className={style.form} onSubmit={addProduct}> {/*novalidate - disable browser validation*/}

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

        </div>
    );
};