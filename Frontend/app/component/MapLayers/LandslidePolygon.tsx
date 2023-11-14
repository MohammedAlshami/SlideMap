import React from 'react'
import Map, { NavigationControl, GeolocateControl, Layer, Source } from 'react-map-gl';

const LandslidePolygon = () => {
    const geojsonData = require('../../data/LandslidePolygoneData.json');

    const allCoordinates: any = [];
    const features = geojsonData.features

    features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates[0];
        allCoordinates.push(coordinates);
      });
    
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
                            "coordinates": allCoordinates
                        }

                    }]
            }}>
                <Layer {...{
                    id: 'data',
                    type: 'fill',
                    paint: {
                        'fill-color': '#F40606',
                        'fill-opacity': 1
                    }       
                }} />
            </Source>
        </>
    )
}

export default LandslidePolygon
