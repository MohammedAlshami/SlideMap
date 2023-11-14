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
        satellite: `mapbox://styles/mapbox/satellite-v9`,
        dark: `mapbox://styles/mapbox/dark-v11`,
        street: `mapbox://styles/mapbox/streets-v12`,
        satellite_street: `mapbox://styles/mapbox/satellite-streets-v12`,
        bubble: `mapbox://styles/mshami/cloxpg4d5010l01pbfnw0en4h`,
    };

    const handleMapStyleChange = (event: any) => {
        setSelectedMapStyle(event.target.value);
    };


    const [selectedLayer, setSelectedLayer] = useState('');

    const mapLayers = {
        malaysiaPolygon: <MalaysiaPolygon />,
        landslidePolygon: <LandslidePolygon />,
        heatMap: <HeatMap />,
    };

    const handleLayerChange = (event: any) => {
        setSelectedLayer(event.target.value);
    };
    return (
        <>

            <div className='w-screen'>
                <label className="p-2 text-white block mb-2 absolute z-50 ">
                    <select
                        value={selectedMapStyle}
                        onChange={handleMapStyleChange}
                        className="p-2 text-purple-500 rounded-md focus:outline-none "
                    >
                        <option value="satellite">Satellite</option>
                        <option value="dark">Dark</option>
                        <option value="street">Street</option>
                        <option value="satellite_street">Satellite Street</option>
                        <option value="bubble">Bubble</option>

                    </select>
                </label>
                <label className="p-2 text-white block mb-2 ml-44 absolute z-50 ">
                    <select
                        value={selectedLayer}
                        onChange={handleLayerChange}
                        className="p-2 text-purple-500 rounded-md focus:outline-none "
                    >
                        <option value="">Select Layer</option>
                        <option value="malaysiaPolygon">Malaysia Polygon</option>
                        <option value="landslidePolygon">Landslide Polygon</option>
                        <option value="heatMap">Heat Map</option>
                    </select>
                </label>
            </div>


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
                    {/* <img src="images/icons/location_icon.svg" alt="Location Icon" /> */}
                </Marker>

                {selectedLayer && mapLayers[selectedLayer]}

                {/* <HeatMap /> */}
                {/* <LandslidePolygon /> */}
                {/* <MalaysiaPolygon /> */}
                <NavigationControl />
                <GeolocateControl />
            </Map>
        </>
    );
}

export default BaseMap;
