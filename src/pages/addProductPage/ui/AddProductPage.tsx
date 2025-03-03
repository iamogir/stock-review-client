import style from './addProductPage.module.css'
import {FormEvent, useEffect, useRef} from "react";
import {Product} from "../../../entities/product/model/types.ts";
import {useDispatch} from "react-redux";
import {addNewProductAsyncAction} from "../../../features/products/actions/productsAsyncActions.ts";
import {AppDispatch} from "../../../app/redux/store.ts";
import {useNavigate} from "react-router-dom";
import {statusUnits, weightUnits} from "../../../shared/consts/product.ts";
import * as React from "react";

const AddProductPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const dropMenuRef = useRef<HTMLElement[]>([]);

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

    const setDropMenuValue = (event: React.MouseEvent<HTMLElement>) => {
        const eventTarget = event.target as HTMLElement;
        const menuHeader = (eventTarget.parentElement as HTMLElement).previousSibling as HTMLElement;
        const inputElement = menuHeader.previousSibling as HTMLInputElement;
        const value = eventTarget.dataset.unit;
        if (value) {
            console.log(eventTarget)
            inputElement.value = value;
            menuHeader.textContent = eventTarget.textContent;
        }

    }

    const openCloseDropMenu = (event: React.MouseEvent<HTMLElement>) => {
        const eventTarget = event.target as HTMLFormElement;
        const menu = eventTarget.nextElementSibling;
        if (!menu) {
            console.log('No menu');
            return;
        }
        menu.classList.toggle(style.openMenu);
    }

    const closeDropMenu = (event: MouseEvent) => {
        const eventTarget = event.target as HTMLFormElement;

        dropMenuRef.current.map(el => {
            if (el !== null && eventTarget !== el)
                el.nextElementSibling?.classList.remove(style.openMenu);
        })
    }

    useEffect(() => {
        document.addEventListener('click', closeDropMenu);
        return () => document.removeEventListener('click', closeDropMenu);
    }, []);

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>
            <form className={style.form} onSubmit={addProduct}> {/*novalidate - disable browser validation*/}

                <label htmlFor={'productName'}>Name</label>
                <input type={'text'} id={'productName'} name={'productName'} />
                <label htmlFor={'category'}>Category</label>
                <input type={'text'} id={'category'} name={'category'} />
                <label htmlFor={'weight'}>Weight</label>
                <input type={'number'} min={0} id={'weight'} name={'weight'} />
                <label htmlFor={'unitWeight'}>Unit of thw weight</label>
                <input type={'hidden'} id={'unitWeight'} name={'unitWeight'} />
                <div className={style.menuHeader} onClick={openCloseDropMenu}
                     ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
                <div className={style.dropMenu} >
                    {weightUnits.map(unit => <div key={unit.key} data-unit={unit.key} onClick={setDropMenuValue}>{unit.value}</div>)}
                </div>
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
                <label htmlFor={'status'}>Status</label>
                <input type={'hidden'} id={'status'} name={'status'} />
                <div className={style.menuHeader} onClick={openCloseDropMenu}
                     ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
                <div className={style.dropMenu} >
                    {statusUnits.map(unit => <div key={unit.key} data-unit={unit.key} onClick={setDropMenuValue}>{unit.value}</div>)}
                </div>

                <br/>
                <button>
                    <span>Add product</span>
                    <input type="submit" style={{display: 'none'}}/>
                </button>
            </form>

        </div>
    );
};

export default AddProductPage;