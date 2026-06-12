import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
       
        {/* <Route path="/emi-calculator" element={<EmiCalculator />} /> */}
        
 



      </Routes>
    </BrowserRouter>
  );
}

export default App;