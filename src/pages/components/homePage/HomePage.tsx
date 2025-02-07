import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/warehouse")}>to warehouse</button>
            <button>add product</button>
            <h3>Status</h3>
        </div>
    );
};

export default HomePage;