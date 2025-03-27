import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const doctors = [
  { id: 1, name: "Dr. Aisha Sharma", specialty: "Cardiologist", rating: 4.8, available: true },
  { id: 2, name: "Dr. Rohan Mehta", specialty: "Dermatologist", rating: 4.5, available: false },
  { id: 3, name: "Dr. Neha Kapoor", specialty: "Neurologist", rating: 4.7, available: true },
];

const DoctorConsultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const bookAppointment = () => {
    if (selectedDoctor && selectedDate) {
      setAppointmentConfirmed(true);
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Book a Doctor Consultation</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`p-4 rounded border cursor-pointer ${
              selectedDoctor?.id === doctor.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <p>⭐ {doctor.rating}</p>
            <p>{doctor.available ? "Available" : "Not Available"}</p>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Select Appointment Date:</h3>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            className="p-2 border rounded mt-2"
          />
          <br />
          <button
            onClick={bookAppointment}
            className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 mt-4"
          >
            Confirm Appointment
          </button>
        </div>
      )}

      {appointmentConfirmed && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold">Appointment Confirmed ✅</h3>
          <p>Doctor: {selectedDoctor.name}</p>
          <p>Date: {selectedDate.toDateString()}</p>
          <a
            href="https://meet.jit.si/HealthcareConsultation"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Join Video Consultation
          </a>
        </div>
      )}
    </div>
  );
};

export default DoctorConsultation;
