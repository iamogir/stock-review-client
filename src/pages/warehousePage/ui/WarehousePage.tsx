import {Product} from "../../../entities/product/model/types.ts";
import ProductCard from "../../../entities/product/ui/ProductCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";
import {useEffect} from "react";
import {getAllProductsAsyncAction} from "../../../features/products/productsAsyncActions.ts";
import {useNavigate} from "react-router-dom";

const WareHouse = () => {

    const {products, loading} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProductsAsyncAction())
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <button onClick={() => navigate("/add_product")}>add product</button>
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

export default WareHouse;