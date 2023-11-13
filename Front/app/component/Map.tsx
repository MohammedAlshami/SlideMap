'use client';
import Map, { NavigationControl, GeolocateControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MalaysiaPolygon from './MapLayers/MalaysiaPolygon';
import LandslidePolygon from './MapLayers/LandslidePolygon';
import HeatMap from './MapLayers/HeatMap';
import React, { useEffect, useState } from 'react';

function BaseMap() {
    const mapboxAccessToken = "pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A";

    const defaultMapStyle = 'mapbox://styles/mapbox/satellite-streets-v12';

    const [selectedMapStyle, setSelectedMapStyle] = useState('');

    console.log(selectedMapStyle)

    const mapStyles = {
        satellite: `mapbox://styles/mapbox/satellite-streets-v12`,
        dark: `mapbox://styles/mapbox/dark-v11`,
    };

    const handleMapStyleChange = (event) => {
        setSelectedMapStyle(event.target.value);
    };

    return (
        <>
            <label className="p-2 text-white block mb-2 ">
                <span className='text-black'>Select Map Style:</span>
                <select
                    value={selectedMapStyle}
                    onChange={handleMapStyleChange}
                    className="p-2 text-purple-500 rounded-md focus:outline-none "
                >
                    <option value="satellite">Satellite</option>
                    <option value="dark">Dark</option>
                </select>
            </label>

            <Map
                mapLib={import('mapbox-gl')}
                mapboxAccessToken={mapboxAccessToken}
                initialViewState={{
                    longitude: 102.910006,
                    latitude: 5.023782,
                    zoom: 14,
                }}
                style={{ width: "100%", height: "100vh" }}
                mapStyle={selectedMapStyle ? mapStyles[selectedMapStyle] : defaultMapStyle}
            >
            

                <Marker longitude={-100} latitude={40} anchor="bottom">
                    <img src="images/icons/location_icon.svg" alt="Location Icon" />
                </Marker>

                <HeatMap />
                {/* <LandslidePolygon /> */}
                <MalaysiaPolygon />
                <NavigationControl />
                <GeolocateControl />
            </Map>
        </>
    );
}

export default BaseMap;
