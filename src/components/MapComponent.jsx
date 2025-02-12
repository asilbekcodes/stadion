import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker ikonkalarini import qilish
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Tasvirlarni to'g'irlash uchun ikonkalarni yangilash
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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
