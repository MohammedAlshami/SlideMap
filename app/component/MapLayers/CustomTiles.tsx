import React from 'react'
import Map, { NavigationControl, GeolocateControl, Layer, Source } from 'react-map-gl';

const CustomTiles = () => {
    const tiffLayer = {
        id: 'tiff-layer',
        type: 'raster',
        source: 'tiff-source',
        minzoom: 13,
        maxzoom: 16,
    };
    return (
        <>
            <Source id="tiff-source" type="raster" tiles={['D:/Desktop_1/Landslide_Images/mdm_badariah_dataset/zoom_15/{z}/{x}/{y}.jpg']} tileSize={256} />
            <Layer  {...tiffLayer} />
            
        </>
    )
}

export default CustomTiles