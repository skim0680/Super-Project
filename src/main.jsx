import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles.css'
import Navbar from "./Navbar"
import Play from "./pages/Play"
import Home from "./pages/home"
import About from "./pages/About"
import Collection from "./pages/Collection"
import Help from "./pages/How to Help"
import SignIn from "./pages/SignIn"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route 
            path="/play" 
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/collection" 
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)