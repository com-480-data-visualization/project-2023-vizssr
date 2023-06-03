import React from 'react';
import { MapContainer, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {cities} from "../../data/mapData"; // replace with your city data file
import './ChoroplethMapPlot.css';
import Legend from "./Legend";


const Legend = () => {
    const legendItems = [
        { color: '#800026', range: '> 100' },
        { color: '#BD0026', range: '80 - 100' },
        { color: '#E31A1C', range: '60 - 80' },
        { color: '#FC4E2A', range: '40 - 60' },
        { color: '#FD8D3C', range: '20 - 40' },
        { color: '#FEB24C', range: '10 - 20' },
        { color: '#FFEDA0', range: '< 10' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {legendItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ backgroundColor: item.color, width: '20px', height: '20px', marginRight: '5px' }}></div>
                    <div>{item.range}</div>
                </div>
            ))}
        </div>
    );
};


const ChoroplethMap = () => {
    const getColor = (index) => {
        // replace this function with your own logic to color the map
        return index > 100 ? '#800026' :
            index > 80  ? '#BD0026' :
                index > 60  ? '#E31A1C' :
                    index > 40  ? '#FC4E2A' :
                        index > 20   ? '#FD8D3C' :
                            index > 10   ? '#FEB24C' :
                                '#FFEDA0';
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div style={{ height: '500px', width: '80%' }} className='map-container'>
                <MapContainer style={{ height: "100%", width: "100%" }} zoom={2} center={[20, 0]}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {cities.map((city, index) => (
                        <CircleMarker
                            key={index}
                            center={[city.lat, city.lon]}
                            fillColor={getColor(city.CostofLivingIndex)}
                            color={getColor(city.CostofLivingIndex)}
                            fillOpacity={0.5}
                            radius={Math.sqrt(city.Population) / 300} // Adjust the radius based on your data
                        >
                            <Popup>{city.City}: {city.CostofLivingIndex}</Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );

};

export default ChoroplethMap;
