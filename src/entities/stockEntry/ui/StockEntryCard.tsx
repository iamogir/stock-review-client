import style from './stockEntryCard.module.css'
import {Product, StockEntry} from "../../product/model/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/redux/store.ts";
import DeleteProductButton from "../../../features/products/deleteProductButton/ui/DeleteProductButton.tsx";

interface Props {
    stockEntry: StockEntry;
}

const StockEntryCard = ({stockEntry}: Props) => {

    const dateExpiration = new Date(stockEntry.expirationDate);
    const {products, loading} = useSelector((state: RootState) => state.products);

    const product: Product | undefined = products?.find(p => p.id === stockEntry.id);

    return ( loading ? <div>Loading...</div> :
            <div>
                <br/>
                <hr/>
                <h2 className={style.temp2}>{product?.name}</h2>
                <h3>Supplier: {stockEntry.supplier}</h3>
                <h4>Category: {product?.category}</h4>
                <p>In stock: {stockEntry.quantityUnits} units</p>
                <p>General weight: {stockEntry.weight} {product?.unitWeight}</p>
                <p className={style.temp}>Sell by: {dateExpiration.getDate()}/{dateExpiration.getUTCMonth() + 1}/{dateExpiration.getFullYear()}</p>
                <p>Location: {stockEntry.storageLocation}</p>
                <h3>Status: {product?.status ? 'in stock' : 'out of stock'}</h3>
                <DeleteProductButton id={stockEntry.id ?? ''} />
                <br/>
            </div>
    );
};

export default StockEntryCard;