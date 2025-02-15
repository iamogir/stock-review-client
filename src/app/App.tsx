import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/homePage/ui/HomePage.tsx";
import WareHouse from "../pages/wareHouse/ui/WareHouse.tsx";
import StartPage from "../pages/startPage/ui/StartPage.tsx";

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
