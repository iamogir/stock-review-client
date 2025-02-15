import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsAsyncAction} from "../../../features/products/productsAsyncActions.ts";
import {Product} from "../../../entities/product/model/types.ts";
import {AppDispatch, RootState} from "../../../app/redux/store.ts";

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading} = useSelector((state: RootState) => state.products);

    useEffect(() => {
        console.log(products)
        dispatch(getAllProductsAsyncAction())
    }, [])

    return (
        loading ? <div>Loading...</div> :
        <div>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button>add product</button>
            <h3>Status</h3>
            <br/>
            {products?.map((pr: Product) => <li>{pr.name}</li>)}
            <li>lol</li>
            <button onClick={() => console.log(products)}>tap</button>
        </div>
    );
};

export default HomePage;