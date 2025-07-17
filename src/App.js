import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Testing from './components/Testing';
import Result from './components/Result';
import Nav from './components/Nav';
import Select from './components/Select';
import Summary from './components/Summary';
import Camera from './components/Camera';
import Capture from './components/Capture';


function App() {

  return (
        <Router>
          <Nav />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary/:id" element={<Summary />} />
      </Routes>
      </Router>
      
  );
}

export default App;

