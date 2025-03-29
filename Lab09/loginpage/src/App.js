import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import HousePricePredictor from './HousePricePredictor';

// #Abenezer Erklo(30172289)
// #Rodney Del Rosario(30208419)
function App() {
  return (
    <Router>
      <Routes>
   
        <Route path="/" element={<Login />} />
        
        <Route path="/predict" element={<HousePricePredictor />} />
      </Routes>
    </Router>
  );
}

export default App;
