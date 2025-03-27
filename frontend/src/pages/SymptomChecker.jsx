import { useState } from "react";

const symptomsList = [
  "Fever", "Cough", "Headache", "Fatigue", "Shortness of Breath",
  "Sore Throat", "Chest Pain", "Nausea", "Dizziness", "Body Aches"
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      setPrediction(null);
      return;
    }

    let riskLevel = "Low";
    if (selectedSymptoms.length >= 3) riskLevel = "Medium";
    if (selectedSymptoms.length >= 5) riskLevel = "High";

    setPrediction({
      condition: "Possible Flu or Infection",
      risk: riskLevel,
      advice: "Stay hydrated, rest well, and consult a doctor if symptoms persist."
    });
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Symptom-Based AI Prediction</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {symptomsList.map((symptom, index) => (
          <button
            key={index}
            onClick={() => toggleSymptom(symptom)}
            className={`px-4 py-2 rounded border ${
              selectedSymptoms.includes(symptom) ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <button
        onClick={analyzeSymptoms}
        className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-600"
      >
        Analyze Symptoms
      </button>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold">Prediction Result</h3>
          <p className="mt-2">Condition: {prediction.condition}</p>
          <p className={`mt-2 font-bold ${prediction.risk === "High" ? "text-red-500" : prediction.risk === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
            Risk Level: {prediction.risk}
          </p>
          <p className="mt-2">{prediction.advice}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
