import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Layout/Home';
import { MedicalInterface } from './components/Layout/MedicalInterface';
import {  BrowserRouter,  Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<MedicalInterface />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
