import style from './productCard.module.css';
import {Product} from "entities/product";

interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {

    return (
        <div>
            <br/>
            <hr/>
            <h2 className={style.temp2}>{product.name}</h2>
            <h4>Category: {product.category}</h4>
            <h4>Brand: {product.brand}</h4>
            <h3>Status: {product.status ? 'in stock' : 'out of stock'}</h3>
            {/*<DeleteProductButton id={product.id ?? ''} />*/}
            <br/>
        </div>
    );
};