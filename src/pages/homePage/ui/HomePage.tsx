import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllProductsAsyncAction,
} from "../../../features/products/actions/productsAsyncActions.ts";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";
import ProductCard from "../../../entities/product/ui/ProductCard.tsx";
import {
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction
} from "../../../features/products/actions/filteredProductsAsyncActions.ts";
import {EXPIRING_SOON_DAYS} from "../../../shared/consts/product.ts";
import style from './homePage.module.css'

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading} = useSelector((state: RootState) => state.products);
    const {expiredProducts, expiringSoonProducts} = useSelector((state: RootState)=> state.filteredProducts)

    const currentDate = new Date();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProductsAsyncAction())
        }
        if (!expiredProducts || expiredProducts.length === 0) {
            dispatch(getExpiredProductsAsyncAction())
        }
        if (!expiringSoonProducts || expiringSoonProducts.length === 0) {
            dispatch(getExpiringSoonProductsAsyncAction(EXPIRING_SOON_DAYS))
        }
    }, [])

    return (
        loading ? <div>
                    <div className={style.date}>{currentDate.getDate()}</div>
                    <div>Loading...</div>
                </div> :
        <div>
            <div className={style.date}>{currentDate.getDate()}</div>
            <h1>Stock review</h1>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <div>
                <div>
                    <h2>Expired products:</h2>
                    {expiredProducts && expiredProducts.map((pr) => <ProductCard key={pr.name} product={pr}/>)}
                </div>
                <div>
                    <h2>Expire in {EXPIRING_SOON_DAYS} days:</h2>
                    {expiringSoonProducts && expiringSoonProducts.map((pr) => <ProductCard key={pr.name + '_exp'} product={pr}/>)}
                </div>
            </div>

        </div>
    );
};

export default HomePage;