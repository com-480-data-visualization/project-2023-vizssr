import React from 'react';
import { useState } from "react";
import { MapContainer, CircleMarker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {cities} from "../../data/mapData"; // replace with your city data file
import './ChoroplethMapPlot.css';
import Legend from './Legend';
import Select from "react-select";

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
    const [map, setMap] = useState(null);

    const options = [
        { label: 'Cost of Living Index', value: 'CostofLivingIndex' },
        { label: 'Rent Index', value: 'RentIndex' },
        { label: 'Cost of Living Plus Rent Index', value: 'CostofLivingPlusRentIndex' },
        { label: 'Groceries Index', value: 'GroceriesIndex' },
        { label: 'Restaurant Price Index', value: 'RestaurantPriceIndex' },
        { label: 'Local Purchasing Power Index', value: 'LocalPurchasingPowerIndex'}
    ];



    const [selectedLivingIndex, setSelectedLivingIndex] = useState('Cost of Living Index');

    return (

        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            id='mapPlot'
        >

            <div style={{ height: '950px', width: '85%' }} className='map-container'>
                <h2 className="map-title">
                    City Cartography:
                    <br/>
                    Charting Population and Living Indices Across the Globe
                </h2>

                <div className='bump-p1'>
                    <div>
                        <p>
                            Step into the dynamic world of <b>urban life</b> with our insightful <b>map plot</b>.
                            Each <b>circle</b> represents a <b>city</b>, its size reflecting the city's <b>population</b>, and its color mirroring the <b>living index</b>.
                        </p>
                        <p>
                            Experience the diversity of living conditions across global cities, as the map plot reveals a vivid spectrum of living indices.
                            Marvel at the larger circles signifying populous cities, and ponder on the correlation between population size and living index - does a larger population suggest a better living index?
                        </p>
                        <p>
                            Discover the <b>outliers</b> that break the mold, both populous cities with lower living indices and smaller cities with higher ones.
                            Delve into the unique circumstances and stories that shape these urban landscapes.
                            Engage with the complexities and contradictions of urban life as you navigate our interactive map, and join the conversation about how we can improve living conditions in cities of all sizes.
                        </p>
                    </div>
                </div>

                <div className="map-index-select" style={{marginTop: '20px'}}>
                    <Select
                        options={options}
                        isSearchable={false}
                        // placeholder={"Select a index"}
                        value={options.find(option => option.value === selectedLivingIndex)}
                        onChange={(option) => setSelectedLivingIndex(option.value)}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: 300
                            })
                        }}
                    />
                </div>
                <MapContainer
                    key={selectedLivingIndex}
                    style={{ height: "100%", width: "100%" }}
                    zoom={2}
                    center={[20, 0]}
                    whenCreated={setMap}
                    minZoom={2} // minimum zoom level
                    maxZoom={8} // maximum zoom level
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Legend /> {/* Add the Legend component to the MapContainer */}
                    {cities.map((city, index) => (
                        <CircleMarker
                            key={index}
                            center={[city.lat, city.lon]}
                            fillColor={getColor(city[selectedLivingIndex])}
                            color={getColor(city[selectedLivingIndex])}
                            fillOpacity={0.8}
                            radius={Math.max(Math.sqrt(city.Population) / 350, 4)} // Adjust the radius based on your data
                            // radius={city.Population / 1000000} // Adjust the radius based on your data
                        >
                            <Tooltip>
                                <div>City: {city.City}</div>
                                <div>Population: {city.Population}</div>
                                <div>{selectedLivingIndex}: {city[selectedLivingIndex]}</div>
                            </Tooltip>
                        </CircleMarker>
                    ))}

                </MapContainer>
            </div>
        </div>
    );
};

export default ChoroplethMap;
