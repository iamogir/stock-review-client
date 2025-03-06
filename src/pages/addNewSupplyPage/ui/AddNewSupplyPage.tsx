import style from './addNewSupplyPage.css'
import * as React from "react";
import {useNavigate} from "react-router-dom";

const AddNewSupplyPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>

        </div>
    );
};

export default AddNewSupplyPage;