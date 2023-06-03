import { scaleSqrt } from 'd3-scale';
import {ResponsiveScatterPlot} from "@nivo/scatterplot";
import Select from 'react-select';

import React, {useState} from "react";
import {bubblePlotData} from "../../data/bubblePlotData";
import 'rsuite/dist/rsuite.min.css';
import './ScatterPlot.css';


const populationScale = scaleSqrt().domain([0, 1000000]).range([5, 15]);


const processDataForScatterPlot = (data, selectedLivingIndex, highlightedContinent) => {
    const continents = [...new Set(data.map((city) => city.Continent))];

    return continents.map((continent) => ({
        id: continent,
        data: data
            .filter(
                (city) =>
                    city.Continent === continent &&
                    city["Local Purchasing Power Index"] &&
                    city[selectedLivingIndex]
            )
            .map((city) => ({
                x: city["Local Purchasing Power Index"],
                y: city[selectedLivingIndex],
                city: city.City,
                Population: city.Population,
            })),
        // itemOpacity: highlightedContinent === null || continent === highlightedContinent ? 1 : 0.2,
    }));
};



const ScatterPlot = () => {

    const [selectedLivingIndex, setSelectedLivingIndex] = useState("Cost of Living Index");
    const [highlightedContinent, setHighlightedContinent] = useState(null);
    const scatterPlotData = processDataForScatterPlot(
        bubblePlotData,
        selectedLivingIndex,
        highlightedContinent
    );

    const options = [
        { label: 'Cost of Living Index', value: 'Cost of Living Index' },
        { label: 'Rent Index', value: 'Rent Index' },
        { label: 'Cost of Living Plus Rent Index', value: 'Cost of Living Plus Rent Index' },
        { label: 'Groceries Index', value: 'Groceries Index' },
        { label: 'Restaurant Price Index', value: 'Restaurant Price Index' }
    ];
    const paragraph1 = "Discover the intricate dance between purchasing power, " +
        "living costs, and city size with our interactive scatter plot. " +
        "Each bubble on the plot represents a city, its position showing the relationship between " +
        "local purchasing power and living costs, while its size reflects the city's population. " +
        "You can select a living cost index from the dropdown menu to see how it affects the " +
        "relationship between purchasing power and living costs. "


    return (
        <div className="scatter-container"
             style={{width: '1200px'}}
             id = 'scatterPlot'
        >
            <h2 className='scatter-title'>
                City Dynamics:
                <br/>
                Exploration of Purchasing Power, Living Costs, and Population
            </h2>
            {/*<p className='scatter-p1'>{paragraph1}</p>*/}
            <div className='scatter-p1'>
                <p>Venture into an interactive exploration of city economics with our dynamic scatter plot. This plot allows you to visualize and understand the relationship between purchasing power, living costs, and city size.</p>
                <ol style={{ marginLeft: '50px' }}>
                    <li>Each bubble on the plot represents a city, its position reflecting the interplay between local purchasing power and living costs, while its size mirrors the city's population.</li>
                    <li>Experience the <b>power of choice</b> as you select different living cost indices from the dropdown menu, observing how each index uniquely influences the relationship between purchasing power and living costs.</li>
                    <li>Dive deeper into the data to uncover surprising patterns and insights. Does higher purchasing power always mean higher living costs? How does city size factor into the equation?</li>
                </ol>
            </div>
            <div className="scatterplot-index-select"
                    style={{marginTop: '20px'}}
            >
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


            <div style={{ height: '600px', width: '900px' }}>
                <ResponsiveScatterPlot
                    data={scatterPlotData}

                    margin={{ top: 30, right: 30, bottom: 60, left: 90 }}
                    xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    xFormat={(value) => value.toFixed(1)}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    yFormat={(value) => value.toFixed(1)}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Local Purchasing Power Index',
                        legendPosition: 'middle',
                        legendOffset: 46,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: selectedLivingIndex,
                        legendPosition: 'middle',
                        legendOffset: -60,
                    }}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: 0,
                            itemsSpacing: 5,
                            itemWidth: 100,
                            itemHeight: 12,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 12,
                            symbolShape: "circle",
                            onMouseEnter: (data) => {
                                setHighlightedContinent(data.id);
                            },
                            onMouseLeave: () => {
                                setHighlightedContinent(null);
                            },
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    colors={{ scheme: 'category10' }}
                    nodeSize={node => populationScale(node.data.Population)}
                    useMesh={true}
                    tooltip={({ node }) => (
                        <div>
                            <strong>{node.data.city}</strong>
                            <br />
                            Local Purchasing Power Index: {node.data.x}
                            <br />
                            {selectedLivingIndex}: {node.data.y}
                            <br />
                            Population: {node.data.Population}

                        </div>
                    )}
                />
            </div>

            <div className='scatter-p2'>
                <p>Delve into the fascinating world of city economics where:</p>
                <ol style={{ marginLeft: '50px' }}>
                    <li>The dance between purchasing power and living costs <b>defies a simple linear narrative</b>, revealing a complex interplay of factors.</li>
                    <li><b>Bigger isn't always pricier!</b> Larger cities often showcase lower living costs, challenging conventional wisdom.</li>
                    <li><b>European and North American</b> cities cluster in the upper right corner, suggesting a unique blend of high purchasing power and living costs.</li>
                </ol>
                <p>Explore these insights and more as our scatter plot unravels the economic tapestry of cities around the world.</p>
            </div>
        </div>
    );
}

export default ScatterPlot;

