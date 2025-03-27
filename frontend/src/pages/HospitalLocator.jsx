import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hospitals = [
  { id: 1, name: "AIIMS Hospital", lat: 28.5672, lng: 77.2100, rating: 4.7, specialty: "General" },
  { id: 2, name: "Fortis Healthcare", lat: 28.5562, lng: 77.1000, rating: 4.5, specialty: "Cardiology" },
  { id: 3, name: "Max Hospital", lat: 28.4500, lng: 77.3123, rating: 4.6, specialty: "Neurology" },
];

const HospitalLocator = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Nearest Hospitals</h2>

      <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
            eventHandlers={{ click: () => setSelectedHospital(hospital) }}
          >
            <Popup>
              <h3 className="font-bold">{hospital.name}</h3>
              <p>⭐ Rating: {hospital.rating}</p>
              <p>Specialty: {hospital.specialty}</p>
              <a
                href={`https://www.openstreetmap.org/directions?to=${hospital.lat},${hospital.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Get Directions
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HospitalLocator;
