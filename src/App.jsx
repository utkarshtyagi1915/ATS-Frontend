import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateResume from "./pages/create";
import ResumeUpload from "./pages/ResumeUpload";
import TemplateSelection from "./Component/TemplateSelection";
import ResumePreview from "./Component/ResumePreview";
import MultipleResume from "./pages/MultipleResume";
import Communication from "./pages/Communication";
import LandingPage from "./Component/LandingPage/LandingPage"; // ✅ Import landing page
// import LoginPage from "./Component/LandingPage/LoginPage";

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* ✅ Show LandingPage first */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/resume-creation" element={<CreateResume />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/resume-preview/:templateId" element={<ResumePreview />} />
        <Route path="/multiple-resumes" element={<MultipleResume />} />
        <Route path="/communication" element={<Communication />} />
      </Routes>
    </Router>
  );
}

export default App;
