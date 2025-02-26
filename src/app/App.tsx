import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/homePage/ui/HomePage.tsx";
import WareHouse from "../pages/warehousePage/ui/WarehousePage.tsx";
import StartPage from "../pages/startPage/ui/StartPage.tsx";
import AddProductPage from "../pages/addProductPage/ui/AddProductPage.tsx";

function App() {

  return (
      <Routes>
          <Route path="*" element={<StartPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/warehouse" element={<WareHouse/>}/>
          <Route path="/add_product" element={<AddProductPage/>}/>
      </Routes>
  )
}

export default App
