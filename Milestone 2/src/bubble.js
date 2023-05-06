import React, { useState, useEffect } from 'react'; 
import * as d3 from 'd3'; 
import { feature } from 'topojson'; 
import './bubble.css';  
import { pointer } from 'd3-selection';

const Bubble = ({ csvData }) => {   
    useEffect(() => {     
        if (!csvData) {       
            return;     
        }      
        
        // Your original d3 code, with minor modifications to work with React, goes here     
        // set the dimensions and margins of the graph
        var margin = {top: 40, right: 150, bottom: 60, left: 30},
        width = 900 - margin.left - margin.right,
        height = 620 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.csv("Cost of Living Index With Population 2.csv", function(data) {

        // ---------------------------//
        //       AXIS  AND SCALE      //
        // ---------------------------//

        // Add X axis
        var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d["Local Purchasing Power Index"]; })])
        .range([0, width]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

        // Add X axis label:
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height+50 )
        .text("Local Purchasing Power Index");

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d["Cost of Living Index"]; })])
        .range([height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Add Y axis label:
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20 )
        .text("Cost of Living Index")
        .attr("text-anchor", "start")

        // Add a scale for bubble size
        var z = d3.scaleSqrt()
        .domain([0, d3.max(data, function(d) { return +d.Population; })])
        .range([1, 30]);

        // Add a scale for bubble color
        var myColor = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.Continent; }))
        .range(d3.schemeCategory10);


        // ---------------------------//
        //      TOOLTIP               //
        // ---------------------------//

        // -1- Create a tooltip div that is hidden by default:
        var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

        // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        var showTooltip = function(d) {
        tooltip
        .transition()
        .duration(200)
        tooltip
        .style("opacity", 1)
        .html("City: " + d.City + "<br>Country: " + d.Country)
        .style("left", (pointer(this)[0]+30) + "px")
        .style("top", (pointer(this)[1]+30) + "px")
        }
        var moveTooltip = function(d) {
        tooltip
        .style("left", (pointer(this)[0]+30) + "px")
        .style("top", (d3.pointer(this)[1]+30) + "px")
        }
        var hideTooltip = function(d) {
        tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
        }

        // ---------------------------//
        //       CIRCLES              //
        // ---------------------------//

        // Add dots
        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d) { return "bubbles " + d.Continent })
        .attr("cx", function (d) { return x(d["Local Purchasing Power Index"]); } )
        .attr("cy", function (d) { return y(d["Cost of Living Index"]); } )
        .attr("r", function (d) { return z(d.Population); } )
        .style("fill", function (d) { return myColor(d.Continent); } )
        // -3- Trigger the functions for hover
        .on("mouseenter", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )


        // ---------------------------//
        //      HIGHLIGHT FUNCTIONS   //
        // ---------------------------//

        function highlight(d) {
        svg.selectAll(".bubbles")
            .style("opacity", function(o) {
                return o.Continent === d ? 1 : 0.1;
            });
        }

        function noHighlight(d) {
        svg.selectAll(".bubbles")
            .style("opacity", 0.8);
        }


        // ---------------------------//
        //       LEGEND              //
        // ---------------------------//

        // Add legend: circles
        var valuesToShow = [1000000, 5000000, 10000000];
        var xCircle = 700;
        var xLabel = 750;
        svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d) {
            return height - 100 - z(d);
        })
        .attr("r", function(d) {
            return z(d);
        })
        .style("fill", "none")
        .attr("stroke", "black");

        // Add legend: segments
        svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr("x1", function(d) {
            return xCircle + z(d);
        })
        .attr("x2", xLabel)
        .attr("y1", function(d) {
            return height - 100 - z(d);
        })
        .attr("y2", function(d) {
            return height - 100 - z(d);
        })
        .attr("stroke", "black")
        .style("stroke-dasharray", "2,2");

        // Add legend: labels
        svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr("x", xLabel)
        .attr("y", function(d) {
            return height - 100 - z(d);
        })
        .text(function(d) {
            return d / 1000000;
        })
        .style("font-size", 10)
        .attr("alignment-baseline", "middle");

        // Legend title
        svg
        .append("text")
        .attr("x", xCircle)
        .attr("y", height - 100 + 30)
        .text("Population (M)")
        .attr("text-anchor", "middle");


        // Add one dot in the legend for each name.
        var size = 20;
        var allgroups = Array.from(new Set(data.map(function(d) { return d.Continent; }))); // Get unique continent names
        svg.selectAll("myrect")
        .data(allgroups)
        .enter()
        .append("circle")
        .attr("cx", 700)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 10 is where the first dot appears. 5 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);

        // Add labels beside legend dots
        svg.selectAll("mylabels")
        .data(allgroups)
        .enter()
        .append("text")
        .attr("x", 720)
        .attr("y", function(d, i) {
            return 3 + i * (size + 5) + (size / 2);
        }) // 10 is where the first dot appears. 5 is the distance between dots
        .style("fill", function(d) {
            return myColor(d);
        })
        .text(function(d) {
            return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);

        // ---------------------------//
        //    Y-AXIS UPDATE FUNCTION  //
        // ---------------------------//

        function updateYAxis(selectedYAxis) {
        // Update the y-axis domain based on the selected index
        y.domain([0, d3.max(data, function(d) { return +d[selectedYAxis]; })]);

        // Update the y-axis with the new domain
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Update the y-axis label
        svg.select(".y.axis-label")
            .text(selectedYAxis);

        // Update the position of the circles based on the selected index
        svg.selectAll("circle.bubbles") // Add .bubbles to avoid selecting legend circles
            .transition()
            .duration(1000)
            .attr("cy", function(d) {
                return y(d[selectedYAxis]);
            });
        }

        // Listen for changes in the drop-down menu and call the updateYAxis function
        d3.select("#selectYAxis")
        .on("change", function() {
            var selectedYAxis = this.value;
            updateYAxis(selectedYAxis);
        });

        })


    }, [csvData]);    
    
    return (     
        <div>       
            <div id="my_dataviz"></div>       
            <select id="selectYAxis">           
                <option value="Cost of Living Index">Cost of Living Index</option>           
                <option value="Rent Index">Rent Index</option>           
                <option value="Cost of Living Plus Rent Index">Cost of Living Plus Rent Index</option>           
                <option value="Groceries Index">Groceries Index</option>           
                <option value="Restaurant Price Index">Restaurant Price Index</option>       
            </select>     
        </div>   
    ); 
};  

export default Bubble;