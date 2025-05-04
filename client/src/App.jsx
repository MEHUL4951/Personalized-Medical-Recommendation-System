import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import { DiseasePredictor } from './components/DiseasePredictor'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/predict" element={<DiseasePredictor></DiseasePredictor>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
