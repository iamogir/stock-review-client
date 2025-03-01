import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllProductsAsyncAction,
    getExpiredProductsAsyncAction
} from "../../../features/products/productsAsyncActions.ts";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";
import ProductCard from "../../../entities/product/ui/ProductCard.tsx";

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products, expiredProducts, loading} = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProductsAsyncAction())
        }
        if (!expiredProducts || expiredProducts.length === 0) {
            dispatch(getExpiredProductsAsyncAction())
        }
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <h1>Stock review</h1>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <h2>Expired products:</h2>
            {expiredProducts && expiredProducts.map((pr) => <ProductCard key={pr.name} product={pr}/>)}
        </div>
    );
};

export default HomePage;