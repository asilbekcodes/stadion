import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import L from "leaflet";

// Marker uchun maxsus ikonka
import customMarkerIcon from "../../public/Stadion.png";

const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [55, 65],
  iconAnchor: [25, 41],
  popupAnchor: [1, -30],
});

// RoutingMachine komponenti (Yo‘nalishni chizish)
const RoutingMachine = ({ userLocation, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null, // Qo‘shimcha marker chiqmasligi uchun
    }).addTo(map);

    // Yo‘l bo‘yicha yozuvlarni yashirish
    const controlContainer = document.querySelector(".leaflet-routing-container");
    if (controlContainer) {
      controlContainer.style.display = "none";
    }

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, userLocation, destination]);

  return null;
};

// MapComponent
const MapComponent = ({ center, zoom, markers, className }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Foydalanuvchi joylashuvini olish
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Foydalanuvchi joylashuvi olinmadi:", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} className={className}>
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* **Foydalanuvchining joylashuvi markerini qo‘shish** */}
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            <b>Bu sizning joylashuvingiz</b>
          </Popup>
        </Marker>
      )}

      {/* **Stadion markerlarini chiqarish** */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.latitude || 0, marker.longitude || 0]}
          icon={customIcon}
          eventHandlers={{
            click: () => setSelectedDestination([marker.latitude || 0, marker.longitude || 0]),
          }}
        >
          <Popup>
            <b>{marker.title || "Noma'lum marker"}</b>
          </Popup>
        </Marker>
      ))}

      {/* **Yo‘nalishni chizish (yozuvlarsiz)** */}
      {userLocation && selectedDestination && (
        <RoutingMachine userLocation={userLocation} destination={selectedDestination} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
