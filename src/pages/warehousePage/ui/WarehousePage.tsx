import {Product, ProductCard} from "entities/product";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "app/redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getAllProductsAsyncAction} from "features/products";

export const WarehousePage = () => {

    const {products, loading} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProductsAsyncAction())
        }
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <button onClick={() => navigate("/add_new_supply")}>add new supply</button>
            <h2>All products in stock</h2>
            {products && products.length > 0 ? products?.filter(pr => pr.status).map((pr: Product) =>
                    <ProductCard product={pr} key={pr.name}/>) :
                <li>no products in stock</li>}
            <h2>All products out of stock</h2>
            {products && products.length > 0 ? products?.filter(pr => !pr.status)
                .map((pr: Product) =>
                    <ProductCard product={pr} key={pr.name}/>) : <p>no products out of stock</p>}
        </div>
    );
};