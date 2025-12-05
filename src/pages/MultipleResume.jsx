import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import axios from "axios";
import AnalyzeImage from "./Analyze-rafiki.svg";
// import MultipleDashboard from "./MultipleDashboard";
import * as XLSX from "xlsx";

function MultipleResume() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  // const [showDashboard, setShowDashboard] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDownloadUrl(null);
    setDashboardData(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        "https://ats-new-backend-ave7edeebycda8g0.centralindia-01.azurewebsites.net/api/analyze/multiple",
        formData,
        {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadFileName(`resume_analysis_${Date.now()}.xlsx`);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setDashboardData(jsonData);
        sessionStorage.setItem("resumeDashboardData", JSON.stringify(jsonData)); // ✅ store in sessionStorage
      };
      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", downloadFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleFolderChange = (event) => {
  const files = event.target.files;
  const oversizedFiles = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > MAX_FILE_SIZE) {
      oversizedFiles.push(files[i].name);
    }
  }

  if (oversizedFiles.length > 0) {
    alert(
      `The following files exceed 50 MB and will not be uploaded:\n${oversizedFiles.join(
        "\n"
      )}`
    );
    // Optionally clear the input
    event.target.value = null;
    return;
  }

  // Continue with your file handling logic
  console.log("Files ready to upload:", files);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Floating Navbar */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-blue-900 dark:text-blue-300 w-full p-4 shadow-lg flex justify-between items-center fixed top-0 z-50 border-b border-blue-100 dark:border-gray-700">
                      {/* Back Arrow */}
                      <Link to="/hr-portal" className="text-blue-700 hover:text-indigo-600 text-xl">
                 <FaArrowLeft />
               </Link>
        <div className="ml-[-45rem] text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Meridian ATS
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/hr-portal"
            className="relative overflow-hidden rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 py-2 px-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <span className="relative z-10">Resume Analyzer</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          {/* <Link
            to="/resume-creation"
            className="relative overflow-hidden rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 py-2 px-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <span className="relative z-10">Create Resume</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link> */}
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mt-24 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/30 dark:border-gray-700/50 transform transition-all duration-500 hover:shadow-3xl">
        {/* Visual Section */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20"></div>

          <img
            src={AnalyzeImage}
            alt="Resume Preview"
            className="w-full h-auto max-h-96 object-contain transform hover:scale-105 transition-transform duration-500 z-10"
          />

          <div className="mt-8 text-center z-10">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Resume Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-md">
              Effortlessly compare multiple resumes against job requirements and identify top candidates with precision.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 dark:bg-gray-800/80 p-8 flex flex-col justify-center items-center rounded-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg z-0"></div>

          <div className="w-full max-w-md relative z-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
            Bulk Resume Analyzer
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
              Upload multiple resumes and get instant analysis against your job description
            </p>

            {/* File Upload with Glow Effect */}
            <div className="mb-6 w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Resumes (Max 50MB)
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                  PDF Only
                </span>
              </label>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <input
                    type="file"
                    webkitdirectory="true"
                    onChange={handleFolderChange}
                    accept=".pdf"
                    ref={fileInputRef}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-3 file:px-4
                  file:rounded-l-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white
                  hover:file:from-blue-700 hover:file:to-indigo-700
                  cursor-pointer transition duration-200"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">Selected Folder:</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {files[0].webkitRelativePath.split("/")[0]}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                      {files.length} files
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Job Description with Floating Label Effect */}
            <div className="w-full mb-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
              Job Description
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500 dark:hover:border-purple-300"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here"
            />
          </div>

            {/* Analyze Button with Pulse Animation */}
            <button
              onClick={handleSubmit}
              disabled={loading || files.length === 0 || !jobDescription}
              className={`w-full py-4 px-6 rounded-full shadow-lg transition-all duration-300 ${loading || files.length === 0 || !jobDescription
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                } text-white font-semibold relative overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Analyze Resumes"
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            {/* Results Section */}
            {downloadUrl && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <button
                  onClick={handleDownload}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Download Analysis</span>
                </button>


                {/* {dashboardData && (
                  <button
                    onClick={() => setShowDashboard(!showDashboard)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>{showDashboard ? "Hide Dashboard" : "View Dashboard"}</span>
                  </button>
                )} */}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2.5 rounded-full animate-progress"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {files.length} files
                  </span>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Analyzing resumes... This may take a moment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      {/* {showDashboard && dashboardData && (
        <div className="mt-8 w-full max-w-6xl px-4 mb-12 animate-fade-in-up">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-700/50">
            <MultipleDashboard data={dashboardData} />
          </div>
        </div>
      )}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-10 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full opacity-10 animate-float animation-delay-4000"></div>
      </div> */}
    </div>
  );
}

export default MultipleResume;
