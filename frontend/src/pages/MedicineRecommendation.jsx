import { useState } from "react";

const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    dosage: "500mg",
    sideEffects: "Nausea, dizziness, stomach pain",
    alternatives: ["Ibuprofen", "Aspirin"],
  },
  {
    id: 2,
    name: "Amoxicillin",
    dosage: "250mg",
    sideEffects: "Diarrhea, skin rash, nausea",
    alternatives: ["Penicillin", "Clarithromycin"],
  },
  {
    id: 3,
    name: "Cetirizine",
    dosage: "10mg",
    sideEffects: "Drowsiness, dry mouth, headache",
    alternatives: ["Loratadine", "Fexofenadine"],
  },
];

const MedicineRecommendation = () => {
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleMoreInfo = (id) => {
    setExpandedMedicine(expandedMedicine === id ? null : id);
  };

  const copyPrescription = (medicine) => {
    const text = `Medicine: ${medicine.name}\nDosage: ${medicine.dosage}\nSide Effects: ${medicine.sideEffects}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">AI-Based Medicine Recommendation</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold">{medicine.name}</h3>
            <p>Dosage: {medicine.dosage}</p>
            <p className="text-sm text-gray-600">Side Effects: {medicine.sideEffects}</p>

            <button
              onClick={() => toggleMoreInfo(medicine.id)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {expandedMedicine === medicine.id ? "Show Less" : "More Info"}
            </button>

            {expandedMedicine === medicine.id && (
              <div className="mt-2 text-sm text-gray-700">
                <p>Alternative Medicines: {medicine.alternatives.join(", ")}</p>
              </div>
            )}

            <button
              onClick={() => copyPrescription(medicine)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
            >
              {copied ? "Copied!" : "Copy Prescription"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineRecommendation;
