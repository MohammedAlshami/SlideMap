// pages/MapPage.js

import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  Circle,
  LayerGroup,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://static.vecteezy.com/system/resources/previews/010/157/629/non_2x/map-pointer-pin-icon-sign-design-free-png.png",
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/010/157/629/non_2x/map-pointer-pin-icon-sign-design-free-png.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const center = [51.505, -0.09];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

const MapPage = () => (
  <MapContainer
    center={center}
    zoom={13}
    scrollWheelZoom={true}
    className="h-96 md:h-[600px]"
    style={{width: "100vh"}}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    />
    <LayersControl position="topright">
      <LayersControl.Overlay name="Marker with popup">
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Layer group with circles">
        <LayerGroup>
          <Circle
            center={center}
            pathOptions={{ fillColor: "blue" }}
            radius={200}
          />
          <Circle
            center={center}
            pathOptions={{ fillColor: "red" }}
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              pathOptions={{ color: "green", fillColor: "green" }}
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Feature group">
        <FeatureGroup pathOptions={{ color: "purple" }}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>

    <FeatureGroup>
      <EditControl
        position="topright"
        // onEdited={this._onEditPath}
        // onCreated={this._onCreate}
        // onDeleted={this._onDeleted}
        draw={{
          rectangle: false,
        }}
      />
      <Circle center={[51.51, -0.06]} radius={200} />
    </FeatureGroup>

  </MapContainer>
);

export default MapPage;
