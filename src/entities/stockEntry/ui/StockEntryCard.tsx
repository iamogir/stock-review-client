import style from './stockEntryCard.module.css'
import { StockEntry} from "entities/stockEntry";
import {deleteStockEntryByIdAsyncAction} from "features/products";
import {DeleteProductButton} from "features/products/deleteProductButton";

interface Props {
    stockEntry: StockEntry;
}

export const StockEntryCard = ({stockEntry}: Props) => {

    const dateExpiration = new Date(stockEntry.expirationDate);

    return (
            <div>
                <br/>
                <hr/>
                <h2 className={style.temp2}>{stockEntry.productInfo?.name}</h2>
                <h3>Supplier: {stockEntry.supplier}</h3>
                <h4>Category: {stockEntry.productInfo?.category}</h4>
                <p>In stock: {stockEntry.quantityUnits} units</p>
                <p>General weight: {stockEntry.weight} {stockEntry.productInfo?.unitWeight}</p>
                <p className={style.temp}>Sell by: {dateExpiration.getDate()}/{dateExpiration.getUTCMonth() + 1}/{dateExpiration.getFullYear()}</p>
                <p>Location: {stockEntry.storageLocation}</p>
                <h3>Status: {stockEntry.productInfo?.status ? 'in stock' : 'out of stock'}</h3>
                <DeleteProductButton name={stockEntry.productInfo.name} index={stockEntry.id} deleteFunc={deleteStockEntryByIdAsyncAction} />
                <br/>
            </div>
    );
};