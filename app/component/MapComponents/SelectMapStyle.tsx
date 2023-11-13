'use client';
import Map, { NavigationControl, GeolocateControl, Layer, Source, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';


function SelectMapStyle() {
    const mapboxAccessToken = "process.env.MAPBOX_TOKEN || """;

    // Sample heatmap data (replace this with your own data)

    const [selectedMapStyle, setSelectedMapStyle] = useState("satellite");

    const handleMapStyleChange = (event: any) => {
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
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            >
                {selectedMapStyle === "dark" && (
                    <Map
                        mapLib={import('mapbox-gl')}
                        mapboxAccessToken={mapboxAccessToken}
                        initialViewState={{
                            longitude: 102.910006,
                            latitude: 5.023782,
                            zoom: 14,
                        }}
                        style={{ width: "100%", height: "100vh" }}
                        mapStyle="mapbox://styles/mapbox/dark-v11"
                    />
                )}

                <Marker longitude={-100} latitude={40} anchor="bottom"  >
                    <img src="images/icons/location_icon.svg" />
                </Marker>


                <NavigationControl />
                <GeolocateControl />
            </Map>
        </>

    );
}

export default SelectMapStyle;