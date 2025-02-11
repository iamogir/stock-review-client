import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/homePage/HomePage.tsx";
import WareHouse from "../pages/wareHouse/WareHouse.tsx";
import StartPage from "../pages/startPage/StartPage.tsx";

function App() {

  return (
      <Routes>
        <Route path="*" element={<StartPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/warehouse" element={<WareHouse/>}/>
      </Routes>
  )
}

export default App
