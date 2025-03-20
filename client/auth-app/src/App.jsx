// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import UserComponent from './UserComponent';
// import './App.css'; // Import the CSS file for styling

// function App() {
//   return (
//     <div className="app-container">
//       {/* App Name */}
//       <h1 className="app-title">Welcome to Auth App</h1>

//       {/* Welcome Message */}
//       <p className="welcome-message">Please login or sign up to continue.</p>

//       {/* Navigation Buttons */}
//       <div className="nav-buttons">
//         <Link to="/login" className="nav-button">Login</Link>
//         <Link to="/signup" className="nav-button">Sign Up</Link>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <Routes>
//           <Route path="/login" element={<UserComponent activeTab="login" />} />
//           <Route path="/signup" element={<UserComponent activeTab="signup" />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;



// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Use Routes and Route for routing
import Home from './components/Home';  // Import Home component
import Login from './components/Login';  // Import Login component
import Register from './components/Register';  // Import Register component

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Home route with links to Login and Sign Up */}
        <Route path="/" element={<Home />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Register page */}
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

