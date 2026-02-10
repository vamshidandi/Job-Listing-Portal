import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JoblistPage from './JoblistPage'
import ApplyPage from './ApplyPage'
import ApplicationsPage from './ApplicationsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/companies" element={<LandingPage />} />
          <Route path="/services" element={<LandingPage />} />
          <Route
            path="/joblist"
            element={
              <ProtectedRoute>
                <JoblistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply/:jobId"
            element={
              <ProtectedRoute>
                <ApplyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App