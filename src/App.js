import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Landingpage/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* You can add more routes like this:
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
