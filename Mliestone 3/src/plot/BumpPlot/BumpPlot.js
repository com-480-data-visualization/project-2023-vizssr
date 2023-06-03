import { ResponsiveAreaBump } from '@nivo/bump';
import React, {useState} from "react";
import { areaBumpDataEurope } from "../../data/areaBumpDataEurope";
import { areaBumpDataAmerica } from "../../data/areaBumpDataAmerica";
import { areaBumpDataAsia } from "../../data/areaBumpDataAsia";
import { areaBumpDataAfrica } from "../../data/areaBumpDataAfrica";
import { areaBumpDataAP } from "../../data/areaBumpDataAP";
import { areaBumpDataWorld } from "../../data/areaBumpDataCIdx";
import Select from 'react-select';
import './BumpPlot.css';

const BumpPlot = ({}) => {
    const [selectedContinent, setSelectedContinent] = useState("Europe");
    const options = [
        { label: 'Europe', value: 'Europe' },
        { label: 'America', value: 'America' },
        { label: 'Asia', value: 'Asia' },
        { label: 'Africa', value: 'Africa' },
        { label: 'Australia Pacific', value: 'Australia Pacific' },
        { label: 'World', value: 'World'}
    ];

    let areaBumpData;
    switch (selectedContinent) {
        case 'Europe':
            areaBumpData = areaBumpDataEurope;
            break;
        case 'America':
            areaBumpData = areaBumpDataAmerica;
            break;
        case 'Asia':
            areaBumpData = areaBumpDataAsia;
            break;
        case 'Africa':
            areaBumpData = areaBumpDataAfrica;
            break;
        case 'Australia Pacific':
            areaBumpData = areaBumpDataAP;
            break;
        case 'World':
            areaBumpData = areaBumpDataWorld;
            break;
        default:
            areaBumpData = areaBumpDataEurope;
            break;
    }

    return (
        <div className='bumpplot-container'
             style={{ width: '1200px',  height: '1150px'}}
             id="bumpPlot"
        >
            <h2 className="bumpplot-title">
                Urban Evolution: Tracing Living Indices of Top Cities (2014-2023)
            </h2>

            <div className='bump-p1'>
                <p>Begin your time-traveling journey with our captivating bump plot. This plot showcases the evolution of the top-ranked cities in terms of living index from 2014 to 2023.</p>
                <ol style={{ marginLeft: '50px' }}>
                    <li>Watch the <b>rise and fall</b> of cities as they jostle for the top spots over the years, reflecting the dynamic nature of urban development.</li>
                    <li>Trace the <b>trajectories</b> of individual cities, observing how their rankings have shifted over time.</li>
                    <li>Identify <b>trends and patterns</b> that span across years, offering a deeper understanding of the factors influencing living indices.</li>
                </ol>
            </div>

            <div className="bumpplot-index-select">
                <Select
                    options={options}
                    isSearchable={false}
                    value={options.find(option => option.value === selectedContinent)}
                    onChange={(option) => setSelectedContinent(option.value)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 300
                        })
                    }}
                />
            </div>

            <div style={{ height: '65%', width: '100%'}}>
                <ResponsiveAreaBump
                    data={areaBumpData}
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
        </div>
    );
}

export default BumpPlot;
