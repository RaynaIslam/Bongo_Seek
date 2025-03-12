// import React from 'react'
// import { Routes, Route, Link } from 'react-router-dom'
// import Signup from './Components/Signup'
// import "./App.css"
// import Login from './Components/login'
// import HomePage from './Components/home'

// function App() {
//   return (
//     <div>
//       {/* Show HomePage only on the "/" route */}
//       {location.pathname === '/' && <HomePage />}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
  
//   );
// }

// export default App

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Signup from './Components/Signup';
import './App.css';
import Login from './Components/login';
import HomePage from './Components/home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
