import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function MultipleDashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem("resumeDashboardData");
    if (storedData) {
      setTimeout(() => {
        setData(JSON.parse(storedData));
        setIsLoading(false);
      }, 1000); // Simulate loading delay for better UX
    }
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (!data || data.length === 0) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-xl text-center"
    >
      <p className="text-xl text-purple-600 dark:text-purple-300">No data available.</p>
    </motion.div>
  );

  // Process data
  const topCandidates = [...data].sort((a, b) => (b.Score || b["Fit Score"] || 0) - (a.Score || a["Fit Score"] || 0)).slice(0, 5);
  const labels = topCandidates.map(item => item.Name || item["Candidate Name"] || "Unknown");
  const scores = topCandidates.map(item => item.Score || item["Fit Score"] || 0);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  // Chart data
  const barData = {
    labels,
    datasets: [
      {
        label: "Fit Score",
        backgroundColor: "rgba(124, 58, 237, 0.8)",
        borderColor: "rgba(124, 58, 237, 1)",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(109, 40, 217, 1)",
        data: scores,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Score Distribution",
        data: scores,
        backgroundColor: [
          "rgba(167, 139, 250, 0.8)",
          "rgba(192, 132, 252, 0.8)",
          "rgba(216, 180, 254, 0.8)",
          "rgba(221, 214, 254, 0.8)",
          "rgba(237, 233, 254, 0.8)"
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
        hoverOffset: 15
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          color: '#6b7280'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Resume Fit Analysis
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Visual representation of candidate matching scores
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-purple-100 dark:bg-purple-900/50 px-4 py-2 rounded-full">
          <span className="text-purple-800 dark:text-purple-200 font-semibold">
            Average Score: <span className="text-2xl ml-1">{avgScore}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Top 5 Candidates
          </h3>
          <Bar 
            data={barData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Best Matching Candidates',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  color: '#4b5563'
                }
              }
            }} 
          />
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300 flex items-center">
            <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
            Score Distribution
          </h3>
          <Pie 
            data={pieData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Score Percentage Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  color: '#4b5563'
                }
              }
            }} 
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">
            Candidate Details
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} total candidates
          </span>
        </div>
        
        <div className="overflow-auto max-h-[400px] rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th 
                    key={key} 
                    className="px-6 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {data.map((item, idx) => (
                <motion.tr 
                  key={idx}
                  whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.05)' }}
                  className="hover:bg-purple-50/50 dark:hover:bg-gray-600/50 transition-colors"
                >
                  {Object.values(item).map((value, i) => (
                    <td 
                      key={i} 
                      className={`px-6 py-4 whitespace-nowrap text-sm ${i === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
                    >
                      {value}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MultipleDashboard;