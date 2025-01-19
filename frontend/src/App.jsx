import { MedicalInterface } from './components/Layout/MedicalInterface';
import {  BrowserRouter,  Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path="/" element=<MedicalInterface /> />
        {/* <Route path="/relativepath" element=<element /> /> */}
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
