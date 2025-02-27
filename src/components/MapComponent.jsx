import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// O'z rangli ikonkani import qilish
import customMarkerIcon from "../../public/Stadion.png";

// O'z rangli ikonkani sozlash
const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [55, 65], // Ikona o'lchami
  iconAnchor: [25, 41], // Ikona anchor nuqtasi
  popupAnchor: [1, -30], // Popup anchor nuqtasi
  shadowSize: [41, 41], // Soyya o'lchami
});

// Ko'p markerlarni qo'llab-quvvatlash uchun MapComponent
const MapComponent = ({ center, zoom, markers, className }) => {
  return (
    <MapContainer center={center} zoom={zoom} className={className}>
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers &&
        markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude || 0, marker.longitude || 0]}
            icon={customIcon} // O'z rangli ikonkani ishlatish
          >
            <Popup>
              <b>{marker.title || "Noma'lum marker"}</b>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;