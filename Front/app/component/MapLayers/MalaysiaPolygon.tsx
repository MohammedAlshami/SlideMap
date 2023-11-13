import React from 'react'
import Map, { NavigationControl, GeolocateControl, Layer, Source } from 'react-map-gl';

const MalaysiaPolygon = () => {
    const geojsonData = require('../../data/MalaysiaPolygonData.json');

    const coordinates = geojsonData.features[0]?.geometry.coordinates;
    return (
        <>
            <Source type="geojson" data={{
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry":
                        {
                            "type": "MultiPolygon",
                            "coordinates": coordinates
                        }

                    }]
            }}>
                <Layer {...{
                    id: 'data',
                    type: 'fill',
                    paint: {
                        'fill-color': '#C3C83F',
                        'fill-opacity': .2  
                    }       
                }} />
            </Source>
        </>
    )
}

export default MalaysiaPolygon
