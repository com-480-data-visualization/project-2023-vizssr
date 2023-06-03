import React, { useState } from 'react';
import Select from "react-select";
import { ResponsiveAreaBump } from '@nivo/bump';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { areaBumpDataEurope } from "./areaBumpDataEurope";
import { areaBumpDataAmerica } from "./areaBumpDataAmerica";
import { areaBumpDataAsia } from "./areaBumpDataAsia";
import { areaBumpDataAfrica } from "./areaBumpDataAfrica";
import { areaBumpDataAP } from "./areaBumpDataAP";
import { bubblePlotData } from "./bubblePlotData"
import { meanIndexData } from './meanIndexData';
import './App.css';


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

const App = () => {
    const [selectedLivingIndex, setSelectedLivingIndex] = useState("Cost of Living Index");
    const [selectedContinent, setSelectedContinent] = useState("Europe");
    const handleSelectedContinent = (event) => {
        setSelectedContinent(event.target.value);
      };

    const [highlightedContinent, setHighlightedContinent] = useState(null);
    const scatterPlotData = processDataForScatterPlot(
        bubblePlotData,
        selectedLivingIndex,
        highlightedContinent
    );
    const [selectedSwarmIndex, setSelectedSwarmIndex] = useState('Cost of Living Index');
    const [highlightedPoint, setHighlightedPoint] = useState(null);

    
    return (
        <div className="App">
            <h2>Bump Plot</h2>
            <h2>Cost of Living Ranking by City - AreaBump</h2>
            <label htmlFor="continent-select">Choose a continent:  </label>
            <select
                id="continent-select"
                value={selectedContinent}
                onChange={handleSelectedContinent}
            >
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="America">America</option>
                <option value="Africa">Africa</option>
                <option value="Australia and Pacific">Australia and Pacific</option>
            </select>
            
            {selectedContinent === 'Europe' && (
                <div style={{ height: '800px' }}> 
                    <ResponsiveAreaBump
                        data={areaBumpDataEurope}
                        margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                        spacing={8}
                        emptyColor="#eeeeee"
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'CoffeeScript'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'TypeScript'
                                },
                                id: 'lines'
                            }
                        ]}
                        startLabel="id"
                        endLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36,
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                    />
                </div>
            )}

            {selectedContinent === 'America' && (
                <div style={{ height: '800px' }}> 
                    <ResponsiveAreaBump
                        data={areaBumpDataAmerica}
                        margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                        spacing={8}
                        emptyColor="#eeeeee"
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'CoffeeScript'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'TypeScript'
                                },
                                id: 'lines'
                            }
                        ]}
                        startLabel="id"
                        endLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36,
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                    />
                </div>
            )}

            {selectedContinent === 'Asia' && (
                <div style={{ height: '800px' }}> 
                    <ResponsiveAreaBump
                        data={areaBumpDataAsia}
                        margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                        spacing={8}
                        emptyColor="#eeeeee"
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'CoffeeScript'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'TypeScript'
                                },
                                id: 'lines'
                            }
                        ]}
                        startLabel="id"
                        endLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36,
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                    />
                </div>
            )}
            {selectedContinent === 'Africa' && (
                <div style={{ height: '800px' }}> 
                    <ResponsiveAreaBump
                        data={areaBumpDataAfrica}
                        margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                        spacing={8}
                        emptyColor="#eeeeee"
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'CoffeeScript'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'TypeScript'
                                },
                                id: 'lines'
                            }
                        ]}
                        startLabel="id"
                        endLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36,
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                    />
                </div>
            )}

            {selectedContinent === 'Australia and Pacific' && (
                <div style={{ height: '800px' }}> 
                    <ResponsiveAreaBump
                        data={areaBumpDataAP}
                        margin={{ top: 100, right: 220, bottom: 100, left: 220 }}
                        spacing={8}
                        emptyColor="#eeeeee"
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'CoffeeScript'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'TypeScript'
                                },
                                id: 'lines'
                            }
                        ]}
                        startLabel="id"
                        endLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36,
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                    />
                </div>
            )}
                

            <h2>Scatter Plot</h2>

            <label htmlFor="living-index-select">Choose a living index:  </label>
            <select
                id="living-index-select"
                value={selectedLivingIndex}
                onChange={(e) => setSelectedLivingIndex(e.target.value)}
            >
                <option value="Cost of Living Index">Cost of Living Index</option>
                <option value="Rent Index">Rent Index</option>
                <option value="Cost of Living Plus Rent Index">Cost of Living Plus Rent Index</option>
                <option value="Groceries Index">Groceries Index</option>
                <option value="Restaurant Price Index">Restaurant Price Index</option>
            </select>

            <div className="scatter-container">

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
                        colors={{ scheme: 'nivo' }}
                        // nodeSize={(node) => (node.size / 10000)} // Adjust size scaling factor as needed
                        nodeSize={10}
                        // nodeSize={(node) => getBubbleSize(node.size, 5, 40)}
                        // nodeSize={{
                        //     key: 'size',
                        //     values: [0, 300000000],
                        //     sizes: [5, 40]
                        // }}
                        useMesh={true}
                        tooltip={({ node }) => (
                            <div>
                                <strong>{node.data.city}</strong>
                                <br />
                                Local Purchasing Power Index: {node.data.x}
                                <br />
                                {selectedLivingIndex}: {node.data.y}
                            </div>
                        )}
                    />
                </div>
            </div>

            <h2>Distribution of Mean Index per Country</h2>
            <label htmlFor="swarm-index-select">Choose an index for the swarm plot:  </label>
            <select
                id="swarm-index-select"
                value={selectedSwarmIndex}
                onChange={(e) => setSelectedSwarmIndex(e.target.value)}
            >
                <option value="Cost of Living Index">Cost of Living Index</option>
                <option value="Rent Index">Rent Index</option>
                <option value="Cost of Living Plus Rent Index">Cost of Living Plus Rent Index</option>
                <option value="Groceries Index">Groceries Index</option>
                <option value="Restaurant Price Index">Restaurant Price Index</option>
                <option value="Local Purchasing Power Index">Local Purchasing Power Index</option>
            </select>
            <div className="swarmplot-container">
                <div style={{ height: '500px', width: '800px' }}>
                    <ResponsiveSwarmPlot
                        data={meanIndexData}
                        groups={['Countries']}
                        groupBy={() => 'Countries'}
                        identity="Country"
                        layout="horizontal"
                        value={selectedSwarmIndex}
                        valueScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                        // size={15}
                        forceStrength={4}
                        simulationIterations={100}
                        colors={{ scheme: 'nivo' }}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: selectedSwarmIndex,
                            legendPosition: 'middle',
                            legendOffset: 36,
                        }}
                        axisRight={null}
                        size={{ key: 'size', values: [5, 30], sizes: [10, 60] }}
                        enableGridY={false}
                        enableGridX={true}
                        animate={true}
                        motionStiffness={50}
                        motionDamping={10}
                        isInteractive={true}
                        useMesh={true}

                        // colors={node => colorScale(node.data.Continent)} // Use the color scale based on the Continent
                        colorBy="Country"
                        // customNode={(node) => (
                        //     <SwarmPlotCustomCircle
                        //         node={node}
                        //         x={node.x}
                        //         y={node.y}
                        //         size={node.size}
                        //         color={node.color}
                        //         onMouseEnter={(data) => {
                        //             setHighlightedPoint(data.id);
                        //         }}
                        //         onMouseLeave={() => {
                        //             setHighlightedPoint(null);
                        //         }}
                        //         highlighted={node.id === highlightedPoint}
                        //     />
                        // )}
                        tooltip={({ node }) => {
                            if (!node || !node.data) {
                                return null;
                            }
                            return (
                                <div>
                                    <strong>{node.data.Country}</strong>
                                    <br />
                                    {selectedSwarmIndex}: {node.data[selectedSwarmIndex]}
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            <footer>
                <p>Representing Numero Cost of Living dataset visualization with Nivo</p>
                <p style={{ fontStyle: 'oblique', marginTop: '0.5rem' }}>
                    By VizSSR Team
                </p>
            </footer>
        </div>
    );
};
export default App;
