import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://skygeni-assignment-backend.onrender.com/bardata");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return; // Wait until data is fetched

    const svg = d3.select(svgRef.current);
    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 }; // Increased bottom margin for legend

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#fff')
      .style('overflow', 'visible');

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.quarter))
      .range([margin.left, width - margin.right])
      .padding(0.6);  // Increase padding to make bars narrower

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d.oldCustomers + +d.newCustomers)]) // Convert strings to numbers
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('*').remove(); // Clear existing elements

    // Grid lines
    svg.append('g')
      .attr('class', 'grid-lines')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat('')
        .tickSizeOuter(0)  // Remove outermost grid line
      )
      .selectAll('line')
      .attr('stroke', '#ccc'); // Change grid line color to gray

    // Old customers bar
    svg
      .selectAll('.bar-old')
      .data(data)
      .join('rect')
      .attr('class', 'bar-old')
      .attr('x', d => xScale(d.quarter))
      .attr('y', d => yScale(+d.oldCustomers))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(+d.oldCustomers))
      .attr('fill', '#4a68ba');

    // New customers bar
    svg
      .selectAll('.bar-new')
      .data(data)
      .join('rect')
      .attr('class', 'bar-new')
      .attr('x', d => xScale(d.quarter))
      .attr('y', d => yScale(+d.oldCustomers + +d.newCustomers))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(+d.oldCustomers) - yScale(+d.oldCustomers + +d.newCustomers))
      .attr('fill', '#f78811');

    // Add labels for old customers
    svg
      .selectAll('.label-old')
      .data(data)
      .join('text')
      .attr('class', 'label-old')
      .attr('x', d => xScale(d.quarter) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(+d.oldCustomers) + (yScale(0) - yScale(+d.oldCustomers)) / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '10px')  // Reduced font size
      .text(d => `$${d.oldCustomers}k`)
      .append('tspan')
      .attr('x', d => xScale(d.quarter) + xScale.bandwidth() / 2)
      .attr('dy', 12)
      .text(d => `(${Math.ceil((+d.oldCustomers / (+d.oldCustomers + +d.newCustomers)) * 100).toFixed()}%)`);

    // Add labels for new customers
    svg
      .selectAll('.label-new')
      .data(data)
      .join('text')
      .attr('class', 'label-new')
      .attr('x', d => xScale(d.quarter) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(+d.oldCustomers + +d.newCustomers) + (yScale(+d.oldCustomers) - yScale(+d.oldCustomers + +d.newCustomers)) / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '10px')  // Reduced font size
      .text(d => `$${d.newCustomers}k`)
      .append('tspan')
      .attr('x', d => xScale(d.quarter) + xScale.bandwidth() / 2)
      .attr('dy', 12)
      .text(d => `(${Math.ceil((+d.newCustomers / (+d.oldCustomers + +d.newCustomers)) * 100).toFixed(0)}%)`);

    // Add total labels on top of each bar
    svg
      .selectAll('.label-total')
      .data(data)
      .join('text')
      .attr('class', 'label-total')
      .attr('x', d => xScale(d.quarter) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(+d.oldCustomers + +d.newCustomers) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .style('font-size', '10px')  // Reduced font size
      .text(d => `$${(+d.oldCustomers + +d.newCustomers).toFixed(0)}k`);

    // Y Axis with values in millions
    svg
      .append('g')
      .call(d3.axisLeft(yScale).tickFormat(d => `${d / 1000}M`))
      .attr('transform', `translate(${margin.left}, 0)`);

    // X Axis
    svg
      .append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${height - margin.bottom})`);

    // X Axis Label
    svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 2 + 25)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .style('font-size', '14px')
      .text('Closed Fiscal Quarter');

    // Legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width / 2 - 140}, ${height - margin.bottom + 80})`); // Position centered below the chart

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#4a68ba'); // Blue color for existing customers

    legend.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('fill', 'black')
      .style('font-size', '12px')
      .text('Existing Customers');

    legend.append('rect')
      .attr('x', 160)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#f78811'); // Orange color for new customers

    legend.append('text')
      .attr('x', 180)
      .attr('y', 10)
      .attr('fill', 'black')
      .style('font-size', '12px')
      .text('New Customers');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
