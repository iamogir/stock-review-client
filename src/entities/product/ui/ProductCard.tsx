import style from './productCard.module.css';
import {Product} from "../model/types.ts";

interface Props {
    product: Product;
}

const ProductCard = ({product}: Props) => {

    console.log(product.expirationDate)

    return (
        <div>
            <hr/>
            <h2>Name: {product.name}</h2>
            <h3>Supplier: {product.supplier}</h3>
            <h4>Category: {product.category}</h4>
            <p>In stock: {product.quantityUnits} units</p>
            <p>General weight: {product.quantityKg} {product.unitWeight}</p>
            <p className={style.temp}>Sell by: {}</p>
            <p>Location: {product.storageLocation}</p>
            <h3>Status: {product.status}</h3>
        </div>
    );
};

export default ProductCard;