import { useState } from "react";

const ReportAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadProgress(0);
      setAnalysisResult(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalysisResult({
              diagnosis: "Mild Anemia",
              suggestions: ["Increase iron intake", "Consult a doctor if symptoms persist"],
            });
          }, 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const handleDownloadReport = () => {
    const reportText = `Diagnosis: ${analysisResult.diagnosis}\n\nSuggestions:\n- ${analysisResult.suggestions.join("\n- ")}`;
    const blob = new Blob([reportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Medical_Report.txt";
    link.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadProgress(0);
      setAnalysisResult(null);
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Medical Report Analyzer</h2>

      <div
        className={`border-2 border-dashed p-6 rounded-lg ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600 mb-2">Drag & drop a medical report or click to upload</p>
        <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
          Choose File
        </label>
      </div>

      {file && <p className="mt-2 text-gray-700">Selected File: {file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={!file}
        className={`px-4 py-2 mt-4 rounded ${
          file ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Upload & Analyze
      </button>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <p>Uploading... {uploadProgress}%</p>
          <div className="w-full bg-gray-200 h-3 rounded mt-2">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${uploadProgress}%`, transition: "width 0.3s ease" }}
            ></div>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold">Analysis Result</h3>
          <p className="mt-2">Diagnosis: {analysisResult.diagnosis}</p>
          <ul className="list-disc list-inside mt-2">
            {analysisResult.suggestions.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
          <button
            onClick={handleDownloadReport}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportAnalyzer;
