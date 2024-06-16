import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://skygeni-assignment-backend.onrender.com/piedata"); // Ensure this is correct
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

  useEffect(() => {
    if (data.length === 0) return;

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.5; // Inner radius for the ring

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous contents

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pieData = pie(data);

    // Draw slices
    g.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white'); // Add white stroke for better separation

    // Add old and new values labels inside slices with percentage
    const total = pieData.reduce((acc, d) => acc + d.data.value, 0);

    g.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text(d => {
        const percentage = ((d.data.value / total) * 100).toFixed(0);
        return `$${d.data.value}K  (${percentage}%)`;
      })
      .style('font-family', 'Arial, sans-serif')
      .style('font-size', '10px')
      .style('fill', 'white'); // Ensure labels are readable

    // Add total label at the center
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(`Total: $${total}K`)
      .style('font-family', 'Arial, sans-serif')
      .style('font-size', '14px');

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PieChart;
