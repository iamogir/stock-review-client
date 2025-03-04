import style from './productCard.module.css';
import { StockEntry} from "../model/types.ts";
import DeleteProductButton from "../../../features/products/deleteProductButton/ui/DeleteProductButton.tsx";

interface Props {
    stockEntry: StockEntry;
}

const ProductCard = ({stockEntry}: Props) => {

    const dateExpiration = new Date(stockEntry.expirationDate);

    return (
        <div>
            <br/>
            <hr/>
            <h2 className={style.temp2}>{stockEntry.name}</h2>
            <h3>Supplier: {stockEntry.supplier}</h3>
            <h4>Category: {stockEntry.category}</h4>
            <p>In stock: {stockEntry.quantityUnits} units</p>
            <p>General weight: {stockEntry.weight} {stockEntry.unitWeight}</p>
            <p className={style.temp}>Sell by: {dateExpiration.getDate()}/{dateExpiration.getUTCMonth() + 1}/{dateExpiration.getFullYear()}</p>
            <p>Location: {stockEntry.storageLocation}</p>
            <h3>Status: {stockEntry.status ? 'in stock' : 'out of stock'}</h3>
            <DeleteProductButton id={stockEntry.entryId ?? ''} />
            <br/>
        </div>
    );
};

export default ProductCard;