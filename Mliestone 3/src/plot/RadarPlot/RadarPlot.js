import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import Select from 'react-select';
import {bubblePlotData} from "../../data/bubblePlotData";
import './RadarPlot.css';

const processDataForRadar = (data, cities) => {
    const indices = ["Cost of Living Index", "Rent Index", "Cost of Living Plus Rent Index", "Groceries Index", "Restaurant Price Index", "Local Purchasing Power Index"];

    return indices.map(index => {
        let obj = { "index": index };
        cities.forEach(city => {
            const cityData = data.find(dataCity => dataCity.City === city.value);
            obj[city.value] = cityData[index];
        });
        return obj;
    });
};

const RadarPlot = () => {
    const cityOptions = bubblePlotData.map(city => ({ label: city.City, value: city.City }));
    const [selectedCities, setSelectedCities] = useState([cityOptions[0]]);

    const radarData = processDataForRadar(bubblePlotData, selectedCities);

    return (
        <div style={{ width: '1200px' }}
             id = "radarPlot"
             className='radar-container'
        >
            <h2 className='radar-title' style={{textAlign: 'left'}}>
                Interactive City Comparison:
                <br/>
                Unraveling Living Indices with Radar Plots
            </h2>

            <div className="radar-p1">
                <p>Step into the world of comparative analysis with our dynamic radar plot. This plot allows you to select and compare the living indices of different cities across six dimensions.</p>
                <ol style={{ marginLeft: '50px' }}>
                    <li>Experience the <b>power of choice</b> as you select the cities you're interested in, tailoring the visualization to your needs.</li>
                    <li>Uncover the <b>strengths and weaknesses</b> of each city as the six axes of the radar plot reveal their living index profiles.</li>
                    <li>Engage in <b>city-to-city comparisons</b>, identifying which cities excel in which living index dimensions.</li>
                </ol>
                <p>Our radar plot is more than just a visualization; it's an interactive tool that empowers you to explore, compare, and understand the multifaceted nature of living indices across the globe.</p>
            </div>

            <div style={{ marginBottom: '10px' }} className='city-select'>
                <Select
                    isSearchable={true}
                    options={cityOptions}
                    isMulti
                    placeholder="Select up to 4 cities..."
                    value={selectedCities}
                    onChange={(selected) => setSelectedCities(selected.slice(0, 4))}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 500
                        })
                    }}
                />
            </div>
            {selectedCities.length < 1 ?
                <p>Please select up to 4 cities to compare.</p> :
                <div style={{ height: '500px', width: '800px' }}>
                    <ResponsiveRadar
                        className="radar-chart"
                        data={radarData}
                        keys={selectedCities.map(city => city.value)}
                        indexBy="index"
                        maxValue="auto"
                        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                        curve="linearClosed"
                        borderWidth={2}
                        borderColor={{ from: 'color' }}
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={36}
                        enableDots={true}
                        dotSize={10}
                        dotColor={{ theme: 'background' }}
                        dotBorderWidth={2}
                        dotBorderColor={{ from: 'color' }}
                        enableDotLabel={true}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors={{ scheme: 'nivo' }}
                        fillOpacity={0.25}
                        blendMode="multiply"
                        animate={true}
                        motionConfig="wobbly"
                        isInteractive={true}
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'column',
                                translateX: -50,
                                translateY: -40,
                                itemWidth: 80,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            }
        </div>
    );
};

export default RadarPlot;
