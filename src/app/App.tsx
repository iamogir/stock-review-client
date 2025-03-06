import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/homePage/ui/HomePage.tsx";
import StartPage from "../pages/startPage/ui/StartPage.tsx";
import AddProductPage from "../pages/addProductPage/ui/AddProductPage.tsx";
import WarehousePage from "../pages/warehousePage/ui/WarehousePage.tsx";
import AddNewSupplyPage from "../pages/addNewSupplyPage/ui/AddNewSupplyPage.tsx";

function App() {

  return (
      <Routes>
          <Route path="*" element={<StartPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/warehouse" element={<WarehousePage/>}/>
          <Route path="/add_product" element={<AddProductPage/>}/>
          <Route path="/add_new_supply" element={<AddNewSupplyPage/>}/>
      </Routes>
  )
}

export default App
