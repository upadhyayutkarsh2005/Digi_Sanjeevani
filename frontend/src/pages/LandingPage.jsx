import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ReportAnalyzer from './pages/ReportAnalyzer';
import SymptomChecker from './pages/SymptomChecker';
import DoctorConsultation from './pages/DoctorConsultation';
import MedicineRecommendation from './pages/MedicineRecommendation';
import HospitalLocator from './pages/HospitalLocator';
import AQIWidget from './pages/AQIWidget';
import Chatbot from './components/Chatbot';
import Dashboard from './pages/Dashboard';


function LandingPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Healthcare at Your Fingertips!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Get instant AI-driven insights, book doctor consultations, and check your health status with ease.</p>
      <div className="mt-6 flex justify-center space-x-4">
        <a href="/symptom-checker" className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600">Check Symptoms</a>
        <a href="/report-analyzer" className="px-6 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600">Analyze Reports</a>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/report-analyzer' element={<ReportAnalyzer />} />
          <Route path='/symptom-checker' element={<SymptomChecker />} />
          <Route path='/doctor-consultation' element={<DoctorConsultation />} />
          <Route path='/medicine-recommendation' element={<MedicineRecommendation />} />
          <Route path='/hospital-locator' element={<HospitalLocator />} />
          <Route path='/aqi-widget' element={<AQIWidget />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Chatbot />
      </Router>
    </div>
  );
}

export default App;
