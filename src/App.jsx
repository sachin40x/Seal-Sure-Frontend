import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import DocumentTextExtractor from './pages/DocumentTextExtractor'
import AcceptanceRejection from './components/AcceptanceRejection'
import HomePage from './components/HomePage'
import Header from './components/Header'
import BankStatement from './components/BankStatement'
import ImageAnalysis from './components/ImageAnalysis'
import AdminDashboard from './components/AdminDashboard'
import DocumentHistory from './components/DocumentHistory'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/extract-text' element={<DocumentTextExtractor />} />

          <Route path='/homepage' element={<HomePage />} />
          <Route path="/acceptance-rejection" element={<AcceptanceRejection />} />
          <Route path="/bank-statement" element={<BankStatement />} />
          <Route path="/image" element={<ImageAnalysis />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/documents" element={<DocumentHistory />} />

        </Routes>
        <Chatbot />
      </BrowserRouter>
    </>
  );
}

export default App;
