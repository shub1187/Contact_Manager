import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./component/Loginpage.jsx";
import Registrationpage from "./component/RegistrationPage.jsx";
import Page, {  } from "./component/Main.js"
import Table from "./component/Table.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/register" element={<Registrationpage />}></Route>
          <Route path="/table" element={<Page />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App;
