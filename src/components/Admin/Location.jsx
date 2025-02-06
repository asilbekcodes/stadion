import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationPicker() {
  const [position, setPosition] = useState(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return position ? <Marker position={[position.lat, position.lng]} /> : null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-lg font-semibold mb-2">Xaritada joylashuvni tanlang</h2>
      
      <MapContainer
        center={[41.2995, 69.2401]} // Toshkent koordinatalari
        zoom={10}
        className="w-full h-[400px] border border-gray-300 rounded-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      {position && (
        <p className="mt-4 text-lg font-semibold">
          Latitude: {position.lat}, Longitude: {position.lng}
        </p>
      )}
    </div>
  );
}
