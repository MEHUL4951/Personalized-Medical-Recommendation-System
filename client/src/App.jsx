import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/Homepage';
import BlogPost  from './pages/BlogPage';
import About from './pages/About';
import Contact from './pages/contact';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/blog" element={<BlogPost></BlogPost>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/contact" element={<Contact></Contact>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
