import style from './addNewSupplyPage.module.css'
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useRef} from "react";
import {StockEntryDto} from "entities/stockEntry";
import {addNewStockEntryAsyncAction} from "features/products";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "app/redux";
import * as React from "react";
import {DropMenu} from "shared/ui/dropMenu";

export const AddNewSupplyPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    const dropMenuRef = useRef<HTMLElement[]>([]);

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

        console.log(eventTarget['expDate'].value);

        dispatch(addNewStockEntryAsyncAction(infoObject));
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

            <form className={style.form} onSubmit={addSupply}>

                <label htmlFor={'type'}>Type of product</label>
                <input type={'hidden'} id={'type'} name={'type'}/>
                <div className={style.menuHeader} onClick={openCloseDropMenu}
                     ref={(el) => {if (el) {dropMenuRef.current.push(el)}}}>Choose</div>
                <div className={style.dropMenu} >
                    {products?.map(pr => <div key={pr.id} data-unit={pr.id} onClick={setDropMenuValue}>{pr.name}</div>)}
                </div>

                <DropMenu id={'id'} variables={[{k: 'v'}]}/>

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