import { StockEntry} from "../../../entities/product/model/types.ts";
import ProductCard from "../../../entities/product/ui/ProductCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";
import {useEffect} from "react";
import {getAllStockEntriesAsyncAction} from "../../../features/products/actions/productsAsyncActions.ts";
import {useNavigate} from "react-router-dom";

const WareHouse = () => {

    const {stockEntries, loading} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!stockEntries || stockEntries.length === 0) {
            dispatch(getAllStockEntriesAsyncAction())
        }
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate("/add_product")}>add product</button>
            <h2>All products in stock</h2>
            {stockEntries && stockEntries.length > 0 ? stockEntries?.filter(pr => pr.status).map((pr: StockEntry) =>
                    <ProductCard stockEntry={pr} key={pr.name}/>) :
                <li>no products in stock</li>}
            <h2>All products out of stock</h2>
            {stockEntries && stockEntries.length > 0 ? stockEntries?.filter(pr => !pr.status)
                .map((pr: StockEntry) =>
                    <ProductCard stockEntry={pr} key={pr.name}/>) : <p>no products out of stock</p>}
        </div>
    );
};

export default WareHouse;