import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllProductsAsyncAction,
    getAllStockEntriesAsyncAction,
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction,
} from "features/products";
import {AppDispatch, RootState} from "app/redux";
import {EXPIRING_SOON_DAYS} from "shared/consts";
import style from './homePage.module.css'
import { StockEntryCard } from "entities/stockEntry";
import {StockEntry} from "entities/product";

export const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products, stockEntries, loading} = useSelector((state: RootState) => state.products);
    const {expiredProducts, expiringSoonProducts} = useSelector((state: RootState)=> state.filteredProducts)

    const currentDate = new Date(Date.now());
    const dateString = currentDate.getDate() + '/' + Number(currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

    console.log(products)

    const loadData = async () => {
        // Проверяем, нужно ли загружать продукты
        if (!products || products.length === 0) {
            await dispatch(getAllProductsAsyncAction());
        }

        // Проверяем, нужно ли загружать записи на складе
        if (!stockEntries || stockEntries.length === 0) {
            await dispatch(getAllStockEntriesAsyncAction());
        }

        // Проверяем, нужно ли загружать истекшие продукты
        if (!expiredProducts || expiredProducts.length === 0) {
            await dispatch(getExpiredProductsAsyncAction());
        }

        // Проверяем, нужно ли загружать продукты, которые скоро истекут
        if (!expiringSoonProducts || expiringSoonProducts.length === 0) {
            await dispatch(getExpiringSoonProductsAsyncAction(EXPIRING_SOON_DAYS));
        }
    };

    useEffect(() => {
        // if (!products || products.length === 0) {
        //     dispatch(getAllProductsAsyncAction());
        // }
        // if (!stockEntries || stockEntries.length === 0) {
        //     dispatch(getAllStockEntriesAsyncAction())
        // }
        // if (!expiredProducts || expiredProducts.length === 0) {
        //     dispatch(getExpiredProductsAsyncAction())
        // }
        // if (!expiringSoonProducts || expiringSoonProducts.length === 0) {
        //     dispatch(getExpiringSoonProductsAsyncAction(EXPIRING_SOON_DAYS))
        // }

        loadData();

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
                    {expiredProducts && expiredProducts.map((pr: StockEntry) => <StockEntryCard key={pr.id} stockEntry={pr}/>)}
                </div>
                <div>
                    <h2>Expire in {EXPIRING_SOON_DAYS} days:</h2>
                    {expiringSoonProducts && expiringSoonProducts.length > 0 ? expiringSoonProducts.map((pr: StockEntry) => <StockEntryCard key={pr.id + '_exp'} stockEntry={pr}/>) :
                    <p>No expired products for next {EXPIRING_SOON_DAYS} days. Great job!</p>}
                </div>
            </div>
        </div>
    );
};