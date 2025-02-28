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
        </div>
    );
};

export default HomePage;