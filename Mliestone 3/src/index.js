import { render } from 'react-dom'
import App from './App'
import ChoroplethMap from "./plot/ChoroplethMapPlot/ChoroplethMapPlot";
import { ThemeProvider } from './contexts/theme'
import './index.css'
import 'leaflet/dist/leaflet.css';


render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
