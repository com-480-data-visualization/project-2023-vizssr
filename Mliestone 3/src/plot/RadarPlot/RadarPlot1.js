import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import Select from 'react-select';
import {bubblePlotData} from "../../data/bubblePlotData";

const processDataForRadar = (data, city1, city2) => {
    if (!city1 || !city2) return [];

    const indices = ["Cost of Living Index", "Rent Index", "Cost of Living Plus Rent Index", "Groceries Index", "Restaurant Price Index", "Local Purchasing Power Index"];
    const cityData1 = data.find(city => city.City === city1);
    const cityData2 = data.find(city => city.City === city2);

    return indices.map(index => ({
        "index": index,
        [city1]: cityData1[index],
        [city2]: cityData2[index]
    }));
};


const RadarPlot = () => {
    const cityOptions = bubblePlotData.map(city => ({ label: city.City, value: city.City }));
    const [selectedCities, setSelectedCities] = useState([]);

    const radarData = processDataForRadar(bubblePlotData,
        selectedCities[0] ? selectedCities[0].value : undefined,
        selectedCities[1] ? selectedCities[1].value : undefined
    );

    return (
        <div style={{ height: '500px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Select
                    options={cityOptions}
                    isMulti
                    placeholder="Select two cities..."
                    value={selectedCities}
                    onChange={(selected) => setSelectedCities(selected.slice(0, 2))}
                />
            </div>
            {selectedCities.length < 2 ?
                <p>Please select two cities to compare.</p> :
                    <ResponsiveRadar
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
                            // translateX: -50,
                            // translateY: -40,
                            // itemWidth: 80,
                            // itemHeight: 20,
                            // itemTextColor: '#999',
                            // symbolSize: 12,
                            // symbolShape: 'circle',
                            // effects: [
                            //     {
                            //         on: 'hover',
                            //         style: {
                            //             itemTextColor: '#000'
                            //         }
                            //     }
                            // ]
                        }
                    ]}
                />
            }
        </div>
    );
};

export default RadarPlot;
