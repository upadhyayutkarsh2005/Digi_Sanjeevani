import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ReportAnalyzer = lazy(() => import("./pages/ReportAnalyzer"));
const SymptomChecker = lazy(() => import("./pages/SymptomChecker"));
const DoctorConsultation = lazy(() => import("./pages/DoctorConsultation"));
const MedicineRecommendation = lazy(() => import("./pages/MedicineRecommendation"));
const HospitalLocator = lazy(() => import("./pages/HospitalLocator"));
const AQIWidget = lazy(() => import("./pages/AQIWidget"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
console.log("App loaded!");
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report-analyzer" element={<ReportAnalyzer />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/doctor-consultation" element={<DoctorConsultation />} />
            <Route path="/medicine-recommendation" element={<MedicineRecommendation />} />
            <Route path="/hospital-locator" element={<HospitalLocator />} />
            <Route path="/aqi-widget" element={<AQIWidget />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
        <Chatbot />
      </Router>
    </div>
  );
}

export default App;