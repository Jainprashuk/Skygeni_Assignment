import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3'; // Import D3 library
import './Table.css'; // Import CSS file for styling

const TableWithD3 = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    if (!tableRef.current || !data.length) return;

    // Select the table element
const table = d3.select(tableRef.current);

// Remove existing table contents
table.selectAll('*').remove();

// Create table header
const thead = table.append('thead');
thead.append('tr')
  .selectAll('th')
  .data(data[0])
  .enter()
  .append('th')
  .style('background-color', (d, i) => i == 1 || i == 3 || i == 5 ? '#4a68ba' : "none")
  .style('background-color', (d, i) => i == 2 || i == 4  ? '#91a6e2' : "none")
  .attr('colSpan', (d, i) => (i >= 1 && i <= 5) ? 3 : 1) // Set colspan for specific columns
  .text(d => d);

// Create table body
const tbody = table.append('tbody');
data.slice(1).forEach(rowData => {
  const row = tbody.append('tr');
  rowData.forEach(cellData => {
    row.append('td').text(cellData);
  });
});
  }, [data]);

  return (
    <div className="custom-table-container"> {/* Add container div */}
      <table ref={tableRef} className="custom-table">
        {/* Table content will be created dynamically */}
      </table>
    </div>
  );
};

export default TableWithD3;
