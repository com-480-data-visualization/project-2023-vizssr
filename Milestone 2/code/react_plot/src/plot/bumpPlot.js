import { ResponsiveAreaBump } from '@nivo/bump';

const BumpPlot = ({ areaBumpData }) => {
    return (
        <div style={{ height: '800px' }}>
            <h2>Cost of Living Ranking by City - AreaBump</h2>
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
    );
}

export default BumpPlot;
