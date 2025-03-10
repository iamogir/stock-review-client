import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import { HomePage } from "pages/homePage";
import { StartPage } from "pages/startPage";
import { AddProductPage } from "pages/addProductPage";
import { WarehousePage } from "pages/warehousePage";
import { AddNewSupplyPage } from "pages/addNewSupplyPage";

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
