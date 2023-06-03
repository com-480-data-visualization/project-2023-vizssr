import React, { useState } from 'react';
import { useContext } from 'react'

import { ThemeContext } from './contexts/theme'
import './App.css';
import BumpPlot from "./plot/BumpPlot/BumpPlot";
import ScatterPlot from "./plot/ScatterPlot/ScatterPlot";
import SwarmPlot from "./plot/SwarmPlot/SwarmPlot";
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import About from "./components/About/About";
import RadarPlot from "./plot/RadarPlot/RadarPlot";
import Conclusion from "./components/Conclusion/Conclusion";
import ChoroplethMap from "./plot/ChoroplethMapPlot/ChoroplethMapPlot";
import Footer from "./components/Footer/Footer";
import 'leaflet/dist/leaflet.css';

import { Divider } from 'rsuite';


const App = () => {
    const [{ themeName }] = useContext(ThemeContext)
    return (
        <div id='top' className={`${themeName} app`}>
            <Header />
            <main>
                <About />
                <Divider />
                <ChoroplethMap />
                <Divider />
                <BumpPlot />
                <Divider />
                <ScatterPlot />
                <Divider />
                <SwarmPlot />
                <Divider />
                <RadarPlot />
                <Divider />
                <Conclusion />
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
};
export default App;
