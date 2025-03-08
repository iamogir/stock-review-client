import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllStockEntriesAsyncAction,
} from "../../../features/products/actions/stockEntriesAsyncActions.ts";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";
import {
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction
} from "../../../features/products/actions/filteredStockEntriesAsyncActions.ts";
import {EXPIRING_SOON_DAYS} from "../../../shared/consts/product.ts";
import style from './homePage.module.css'
import StockEntryCard from "../../../entities/stockEntry/ui/StockEntryCard.tsx";

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {stockEntries, loading} = useSelector((state: RootState) => state.products);
    const {expiredProducts, expiringSoonProducts} = useSelector((state: RootState)=> state.filteredProducts)

    const currentDate = new Date(Date.now());
    const dateString = currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear();

    useEffect(() => {
        if (!stockEntries || stockEntries.length === 0) {
            dispatch(getAllStockEntriesAsyncAction())
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
                    <div className={style.date}>{dateString}</div>
                    <div>Loading...</div>
                </div> :
        <div>
            <div className={style.date}>{dateString}</div>
            <h1>Stock review</h1>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <button onClick={() => navigate("/add_new_supply")}>add new supply</button>
            <div className={style.expProducts}>
                <div>
                    <h2>Expired products:</h2>
                    {expiredProducts && expiredProducts.map((pr) => <StockEntryCard key={pr.id} stockEntry={pr}/>)}
                </div>
                <div>
                    <h2>Expire in {EXPIRING_SOON_DAYS} days:</h2>
                    {expiringSoonProducts && expiringSoonProducts.length > 0 ? expiringSoonProducts.map((pr) => <StockEntryCard key={pr.id + '_exp'} stockEntry={pr}/>) :
                    <p>No expired products for next {EXPIRING_SOON_DAYS} days. Great job!</p>}
                </div>
            </div>
        </div>
    );
};

export default HomePage;