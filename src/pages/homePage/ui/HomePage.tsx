import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsAsyncAction} from "../../../features/products/productAcyncActions.ts";
import {Product} from "../../../entities/product/model/types.ts";

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {products} = useSelector((state) => state.homePage);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(getAllProductsAsyncAction)
    }, [])

    return (
        <div>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button>add product</button>
            <h3>Status</h3>
            <br/>
            {products.map((pr: Product) => <li>{pr.name}</li>)}
        </div>
    );
};

export default HomePage;