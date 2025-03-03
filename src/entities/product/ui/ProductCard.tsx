import style from './productCard.module.css';
import {Product} from "../model/types.ts";

interface Props {
    product: Product;
}

const ProductCard = ({product}: Props) => {

    const dateExpiration = new Date(product.expirationDate);

    return (
        <div>
            <br/>
            <hr/>
            <h2 className={style.temp2}>Name: {product.name}</h2>
            <h3>Supplier: {product.supplier}</h3>
            <h4>Category: {product.category}</h4>
            <p>In stock: {product.quantityUnits} units</p>
            <p>General weight: {product.weight} {product.unitWeight}</p>
            <p className={style.temp}>Sell by: {dateExpiration.getDate()}/{dateExpiration.getUTCMonth() + 1}/{dateExpiration.getFullYear()}</p>
            <p>Location: {product.storageLocation}</p>
            <h3>Status: {product.status ? 'in stock' : 'out of stock'}</h3>
            <br/>
        </div>
    );
};

export default ProductCard;