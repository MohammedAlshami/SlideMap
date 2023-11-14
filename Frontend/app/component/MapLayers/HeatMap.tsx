import React from 'react'
import Map, { NavigationControl, GeolocateControl, Layer, Source } from 'react-map-gl';

const HeatMap = () => {
    const heatmapData = [
        { "lng": 102.910006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.920006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.930006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.940006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.950006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.960006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.910006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.920006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.930006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.940006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.950006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.960006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.910006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.920006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.930006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.940006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.950006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.960006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.910006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.920006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.930006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.940006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.950006, "lat": 5.023782, "weight": .1 },
        { "lng": 102.960006, "lat": 5.023782, "weight": .1 },
        
        // Add more data points as needed
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