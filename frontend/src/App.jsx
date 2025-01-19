import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Layout/Home';
import { MedicalInterface } from './components/Layout/MedicalInterface';
import { PatientInterface } from './components/Layout/PatientInterface';

const medications = [{
  medication: "Insulin",
  startdate: new Date("2024-01-05"),
  duration: "1 year",
  dose: "Every day, after meals"
}]
const conditions = [{ condition: "Diabetes Type II" }];
const symptoms = [{ symptom: "Stomach Ache" }, { symptom: "Nausea" }];

const initialStructuredData = {
  "conditions": conditions,
  'symptoms': symptoms,
  "medications": medications
}

function App() {
  const [structuredData, setStructuredData] = useState(initialStructuredData);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<MedicalInterface structuredData={structuredData} setStructuredData={setStructuredData} />} />
          <Route path="/patient" element={<PatientInterface structuredData={structuredData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
