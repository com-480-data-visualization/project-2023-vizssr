import { useMap } from 'react-leaflet';
import L from 'leaflet';
import './Legend.css';
import React from 'react';

function Legend() {
    const map = useMap();

    React.useEffect(() => {
        const getColor = index => {
            return index > 100 ? '#800026' :
                index > 80  ? '#BD0026' :
                    index > 60  ? '#E31A1C' :
                        index > 40  ? '#FC4E2A' :
                            index > 20   ? '#FD8D3C' :
                                index > 10   ? '#FEB24C' :
                                    '#FFEDA0';
        };

        const legend = L.control({ position: "bottomright" });

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [0, 10, 20, 50, 100];
            let labels = [];
            let from;
            let to;

            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    '<i style="background:' +
                    getColor(from + 1) +
                    '"></i> ' +
                    from +
                    (to ? "&ndash;" + to : "+")
                );
            }

            div.innerHTML = labels.join("<br>");
            return div;
        };

        legend.addTo(map);
    }, [map]);

    return null;
}

export default Legend;
