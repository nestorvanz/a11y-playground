import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toast } from "./modules/toast/Toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/toast" element={<Toast />} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>Accessibity playground</span>

          <a href="/toast"></a>
        </header>
      </div>
    </>
  );
}

export default App;
