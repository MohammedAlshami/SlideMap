import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic';


const Map = () => {
    return (
        <div className='h-screen w-screen '>
            <MapContainer  center={[4.2105, 101.9758]} zoom={7} scrollWheelZoom={true} style={{ height: "100%", width: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A"
                />

            </MapContainer>
        </div>
    )
}

export default Map
