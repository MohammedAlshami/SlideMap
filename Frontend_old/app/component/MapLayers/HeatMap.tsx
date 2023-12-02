import React from 'react'
import Map, { NavigationControl, GeolocateControl, Layer, Source } from 'react-map-gl';

const HeatMap = () => {
    const heatmapData = [
        { "lng": 102.910006, "lat": 5.023782, "weight": 0.1 },
        { "lng": 102.920006, "lat": 5.023782, "weight": 0.1 },
        { "lng": 102.930006, "lat": 5.023782, "weight": 0.1 },
        { "lng": 102.940006, "lat": 5.023782, "weight": 0.1 },
        { "lng": 102.950006, "lat": 5.023782, "weight": 0.1 },
        { "lng": 102.960006, "lat": 5.023782, "weight": 0.1 },
        { "lng": -73.935242, "lat": 40.730610, "weight": 0.5 }, // New York, USA
        { "lng": 2.352222, "lat": 48.856614, "weight": 0.7 }, // Paris, France
        { "lng": 139.691706, "lat": 35.689487, "weight": 0.4 }, // Tokyo, Japan
        { "lng": -0.127647, "lat": 51.507321, "weight": 0.6 }, // London, UK
        { "lng": 77.209021, "lat": 28.613939, "weight": 0.3 }, // New Delhi, India
        { "lng": 114.0719, "lat": 51.0447, "weight": 0.2 }, // Astana, Kazakhstan
        { "lng": -99.1332, "lat": 19.4326, "weight": 0.8 }, // Mexico City, Mexico
        { "lng": 4.895168, "lat": 52.370216, "weight": 0.5 }, // Amsterdam, Netherlands
        { "lng": 116.407396, "lat": 39.904200, "weight": 0.6 }, // Beijing, China
        { "lng": 151.2093, "lat": -33.8688, "weight": 0.4 }, // Sydney, Australia
    ];


    const heatmapSource = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: heatmapData.map(point => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [point.lng, point.lat],
                },
                properties: {
                    weight: point.weight,
                },
            })),
        },
    };
    const heatmapLayer = {
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'heatmap-source',
        paint: {
            'heatmap-weight': {
                type: 'exponential',
                property: 'weight',
                stops: [
                    [0, 0],
                    [1, 1],
                ],
            },
            'heatmap-intensity': 1.2,
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)',
            ],
            'heatmap-radius': {
                type: 'exponential',
                stops: [
                    [1, 5],
                    [10, 30],
                ],
            },
            'heatmap-opacity': 0.8,
        },
    };


    return (
        <>
            <Source id="heatmap-source" type="geojson" data={heatmapSource.data} />
            <Layer {...heatmapLayer} />
        </>


    )
}

export default HeatMap