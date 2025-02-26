import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsAsyncAction} from "../../../features/products/productsAsyncActions.ts";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading} = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProductsAsyncAction())
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <h1>Stock review</h1>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <h2>All products in stock</h2>
            {/*{products && products.length > 0 ? products?.filter(pr => pr.status).map((pr: Product) =>*/}
            {/*    <ProductCard product={pr} key={pr.name}/>) :*/}
            {/*    <li>no products in stock</li>}*/}
            {/*<h2>All products out of stock</h2>*/}
            {/*{products && products.length > 0 ? products?.filter(pr => !pr.status)*/}
            {/*    .map((pr: Product) =>*/}
            {/*        <ProductCard product={pr} key={pr.name}/>) : <p>no products out of stock</p>}*/}
            <button onClick={() => console.log(products)}>tap</button>
        </div>
    );
};

export default HomePage;