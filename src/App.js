import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './components/Home';
import Start from './components/Start';
import Analysis from './components/Analysis';

// ... (Your page components like HomePage, AboutPage, etc.)

function App() {

  return (
    


        <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="Analysis" element={<Analysis />} />
      </Routes>
      </Router>
      
  );
}

export default App;

