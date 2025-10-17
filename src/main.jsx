import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles.css'
import Navbar from "./Navbar"
import Play from "./pages/Play"
import Home from "./pages/home"
import Collection from "./pages/Collection"
import AnimalPage from "./pages/AnimalPage"
import Help from "./pages/How to Help"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/play" element={<Play />} />
          <Route path="/animal/:id" element={<AnimalPage />} />
          <Route path="/collection" element={<Collection />} />
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