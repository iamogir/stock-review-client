import {useNavigate} from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button>Sign in</button>
            <button>Sign up</button>
            <button onClick={() => navigate("/home")}>Just look</button>
        </div>
    );
};

export default StartPage;