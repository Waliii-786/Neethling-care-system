// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Home from "./Pages/Home";
import ImageUpload from "./Pages/ImageClassification";
import Chat from './Components/Chat'; // Import the Chat component
import Map from './Components/Map';
import Form from './Components/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/image-upload" element={<ImageUpload />} />
        <Route path="/location" element={<Map />} />
        <Route path="/check-stage" element={<Form />} />
        <Route path="/chat" element={<Chat />} /> {/* Add a new route for Chat */}
      </Routes>
    </Router>
  );
}

export default App;
