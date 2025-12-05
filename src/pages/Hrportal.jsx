import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Animation,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Hrportal = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading2, setLoading2] = useState(false);
  
 const handleGenerateAIJD = async () => {
  try {
    console.log("Generate AI JD Clicked!");

    setLoading2(true);

    const res = await api.post("/JdGenerate", {
      role: jobDescription,   // sending to backend
    });

    console.log("AI JD Response:", res.data);

    if (res.data?.jobDescription) {
      setJobDescription(res.data.jobDescription);  // update textarea
    } else {
      alert("Failed to generate JD");
    }

  } catch (error) {
    console.error("Error generating AI JD:", error);
    alert("Something went wrong");
  } finally {
    setLoading2(false);
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

    if (file) {
      // Check size
      if (file.size > MAX_SIZE) {
        setError("File size exceeds 1 MB. Please upload a smaller PDF.");
        e.target.value = null; // Clear input
        setResume(null);
        setResumeUrl(null);
        return;
      }

      // Valid file
      setError("");
      setResume(file);

      const fileURL = URL.createObjectURL(file);
      setResumeUrl(fileURL);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await api.post(
      "/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API Response:", response.data);
    setResults(response.data);

  } catch (error) {
    console.error(
      "Error uploading resume:",
      error.response?.data || error.message
    );
    setError("Failed to analyze resume. Please check the console for details.");
  } finally {
    setLoading(false);
  }
};

  // Function to get the color based on score
  const getScoreColor = (score) => {
    if (score < 40) return "rgba(255, 99, 132, 0.6)"; // Red
    if (score < 80) return "rgba(255, 206, 86, 0.6)"; // Yellow
    return "rgba(75, 192, 192, 0.6)"; // Green
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center w-[98.7vw]">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-blue-900 dark:text-blue-300 w-full p-4 shadow-lg flex justify-between items-center">
        {/* Back Arrow */}
        <Link
          to="/role"
          className="text-blue-700 hover:text-indigo-600 text-xl"
        >
          <FaArrowLeft />
        </Link>
        <div className="ml-[-44rem] text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Meridian ATS
        </div>
        <div className="flex items-center space-x-4">
          {/* Add the Create Resume button */}
          <Link
            to="/multiple-resumes"
            className="rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 py-2 px-4 transition duration-300 hover:text-white hover:shadow-md"
          >
            Bulk Resume Analyzer
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

      {/* Content Area */}
      <div className="w-full max-w-7xl mt-12 grid grid-cols-2 gap-8 bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden transition-transform transform">
        {/* Resume Preview */}
        <div className="p-6 flex flex-col items-center">
          {resumeUrl ? (
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              style={{ minHeight: "600px" }}
            />
          ) : (
            <img
              src="https://assets.website-files.com/5ffd61d36b01f7a71eb30509/60364829a7907272fdada1d1_DevOps%20Engineer-1.png"
              alt="Resume Preview"
              className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            />
          )}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Resume Analyzer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg">
            Compare resumes to the job description and highlight the top-scoring
            candidate
          </p>
          <div className="w-full mb-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
              Upload Resume (PDF)
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                Max 1 MB
              </span>
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="block w-full text-sm text-gray-500 dark:text-gray-400
    file:mr-4 file:py-3 file:px-4
    file:rounded-l-lg file:border-0
    file:text-sm file:font-semibold
    file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white
    hover:file:from-blue-700 hover:file:to-indigo-700
    cursor-pointer transition duration-200"
            />

            {/* Using your existing error state */}
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
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
          <div className="w-full flex gap-4 mt-4">

  {/* Analyze Button */}
  <button
    onClick={handleSubmit}
    className="w-1/2 py-3 rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "Analyzing..." : "Analyze"}
  </button>

  {/* Generate AI JD Button */}
  <button
    onClick={handleGenerateAIJD}  // You can create this function
    disabled={jobDescription.trim() === ""}
    className="w-1/2 py-3 rounded-full shadow-sm text-white 
      bg-gradient-to-r from-purple-600 to-pink-600 
      transition duration-300 transform hover:scale-105
      disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading2 ? "Generating..." : "Generate AI JD"}
  </button>

</div>
          {error && <p className="text-red-500 mt-4">{error}</p>}{" "}
          {/* Display error if any */}
        </div>
      </div>

      {/* Results Display (if available) */}
      {results && (
        <div className="mt-12 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-7xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            Analysis Results
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
            
              {/* JScore Section */}
              {results.JScore !== undefined && (
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md 
                                transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 
                                mt-5 w-full md:w-1/2">
            
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-lg font-semibold text-purple-600 dark:text-purple-300 text-left p-4">
                          <i className="fas fa-chart-pie text-purple-600 dark:text-purple-300 text-2xl mr-2"></i>
                          Overall Fitment Score
                        </th>
                      </tr>
                    </thead>
            
                    <tbody>
                      <tr>
                        <td className="p-4">
                          <div className="relative" style={{ height: "200px" }}>
                            <Doughnut
                              data={{
                                labels: ["JScore", "Remaining"],
                                datasets: [
                                  {
                                    data: [results.JScore, 100 - results.JScore],
                                    backgroundColor: [
                                      getScoreColor(results.JScore),
                                      "rgba(211, 211, 211, 0.5)",
                                    ],
                                    borderWidth: 0,
                                  },
                                ],
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  tooltip: {
                                    callbacks: {
                                      label: (tooltipItem) => {
                                        const label =
                                          tooltipItem.label === "JScore"
                                            ? "JScore: "
                                            : "Remaining: ";
                                        return `${label} ${tooltipItem.raw}%`;
                                      },
                                    },
                                  },
                                  legend: {
                                    display: false,
                                  },
                                },
                              }}
                            />
            
                            {/* Center Percentage Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
                                <span className={`font-bold ${getScoreColor(results.JScore)}`}>
                                  {results.JScore}
                                </span>
                                %
                              </p>
                            </div>
            
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            
                </div>
              )}
            
              {/* Job Title Match Section */}
              {results["Job Title Match"] !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg 
                                transition duration-300 hover:shadow-2xl 
                                w-full md:w-1/2">
            
                  <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
                    <span className="text-2xl mr-2">
                      <i
                        className={`fas fa-${
                          results["Job Title Match"] === "Matched"
                            ? "check-circle"
                            : "times-circle"
                        } text-${
                          results["Job Title Match"] === "Matched"
                            ? "green-500 dark:text-green-400"
                            : "red-500 dark:text-red-400"
                        }`}
                      ></i>
                    </span>
                    Job Title Match
                  </h2>
            
                  <p className="text-gray-700 dark:text-gray-200 text-lg">
                    {results["Job Title Match"] === "Matched" ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold flex items-center">
                        <i className="fas fa-thumbs-up mr-2"></i> Matched
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-semibold flex items-center">
                        <i className="fas fa-thumbs-down mr-2"></i> Not Matched
                      </span>
                    )}
                  </p>
            
                </div>
              )}
            
            </div>
            {/* Skills Section */}
            {results.Skills && (
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6">
                  Skills
                </h2>
                <div className="ml-4">
                  {Object.entries(results.Skills).map(
                    ([skillCategory, skills], index) => (
                      <div key={index} className="mb-6">
                        <div className="flex items-center mb-4">
                          <span className="text-purple-600 dark:text-purple-300 text-2xl mr-3">
                            {skillCategory === "TechnicalSkills" ? (
                              <i className="fas fa-laptop-code"></i>
                            ) : skillCategory === "SoftSkills" ? (
                              <i className="fas fa-comments"></i>
                            ) : skillCategory === "DesignSkills" ? (
                              <i className="fas fa-paint-brush"></i>
                            ) : skillCategory === "CommunicationSkills" ? (
                              <i className="fas fa-volume-up"></i>
                            ) : (
                              <i className="fas fa-cogs"></i>
                            )}
                          </span>
                          <h3 className="text-xl font-medium text-purple-600 dark:text-purple-300">
                            {skillCategory}:
                          </h3>
                        </div>
                        <table className="table-auto w-full text-left bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500">
                          <thead>
                            <tr className="bg-purple-100 dark:bg-purple-800">
                              <th className="px-4 py-3 text-gray-700 dark:text-gray-200 font-semibold">
                                Skill
                              </th>
                              <th className="px-4 py-3 text-gray-700 dark:text-gray-200 font-semibold">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(skills).map(
                              ([skill, matched], skillIndex) => (
                                <tr
                                  key={skillIndex}
                                  className={`border-t ${
                                    skillIndex % 2 === 0
                                      ? "bg-gray-50 dark:bg-gray-600"
                                      : "bg-white dark:bg-gray-700"
                                  } hover:bg-purple-50 dark:hover:bg-purple-800 transition`}
                                >
                                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                                    {skill}
                                  </td>
                                  <td className="px-4 py-3">
                                    {matched ? (
                                      <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800 rounded-full">
                                        ✓ Matched
                                      </span>
                                    ) : (
                                      <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-800 rounded-full">
                                        ✗ Not Matched
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Matched Projects And Internships Section */}
            {results["Matched Projects And Internships"] &&
              results["Matched Projects And Internships"].length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl mt-5">
                  <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-6 flex items-center">
                    <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                      <i className="fas fa-project-diagram"></i>{" "}
                      {/* Icon for Projects */}
                    </span>
                    Matched Projects
                  </h2>

                  {/* Grid layout for projects/internships */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {results["Matched Projects And Internships"].map(
                      (project, index) => (
                        <div
                          key={index}
                          className="p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition duration-200 hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-900"
                        >
                          <div className="flex justify-between items-center mb-3">
                            {/* Project/Internship Type Icon */}
                            <div className="flex items-center">
                              {project.Project ? (
                                <i className="fas fa-folder-open text-purple-600 dark:text-purple-300 mr-2"></i>
                              ) : (
                                <i className="fas fa-briefcase text-purple-600 dark:text-purple-300 mr-2"></i>
                              )}
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {project.Project || project.Internship}
                              </h3>
                            </div>
                            {/* Status Icon for Matched */}
                            <div>
                              <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                                Matched
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {project.Description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      <div className="h-16"></div>
    </div>
  );
};

export default Hrportal;
