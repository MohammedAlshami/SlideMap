// components/Map.tsx
import { MapContainer, Marker, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map({ onSelectPolygon }) {
  const handleMapClick = (e) => {
    onSelectPolygon(e.latlng);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '400px' }} onClick={handleMapClick}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
