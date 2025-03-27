import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, date: "2024-03-20", condition: "Normal", details: "Blood pressure and sugar levels are stable." },
    { id: 2, date: "2024-02-15", condition: "Mild Hypertension", details: "Monitor salt intake and exercise regularly." },
    { id: 3, date: "2024-01-10", condition: "Diabetes Risk", details: "Recommended further tests and lifestyle changes." },
  ]);

  const healthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Blood Pressure (mmHg)",
        data: [120, 125, 130, 128, 126, 122],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
      {
        label: "Blood Sugar (mg/dL)",
        data: [90, 95, 100, 98, 96, 92],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {/* Health Progress Graph */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-2">Health Progress</h3>
        <Line data={healthData} />
      </div>

      {/* Health Report History */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-bold mb-2">Health Report History</h3>
        <ul>
          {reports.map((report) => (
            <li key={report.id} className="border-b py-2">
              <strong>{report.date}</strong> - <span className="text-blue-600">{report.condition}</span>
              <p className="text-sm text-gray-600">{report.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
