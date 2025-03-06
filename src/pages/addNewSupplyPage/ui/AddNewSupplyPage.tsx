import style from './addNewSupplyPage.css'
import {useNavigate} from "react-router-dom";

const AddNewSupplyPage = () => {

    const navigate = useNavigate();

    const addSupply = () => {

    }

    return (
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/warehouse')}>To warehouse</button>

            <form className={style.form} onSubmit={addSupply}>

            </form>

        </div>
    );
};

export default AddNewSupplyPage;