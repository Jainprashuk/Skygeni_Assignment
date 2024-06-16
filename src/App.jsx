import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Table from "./components/Table";
import TableWithD3 from "./components/Table";
import StarterPage from "./components/StarterPage";

function App() {
  const piedata = [
    { label: "Old", value: 1908 },
    { label: "New", value: 4455 },
  ];

  const [time , settime] = useState(0);

  setTimeout(()=>{
    settime(time+1);
  },1000)
  

  return (
    <>
      
      
      <p>{time}</p>

      {
        time<=5 ?
          <StarterPage/>  :
          <div
          className="bg-white  p-2 mx-3 my-6 shadow-2xl rounded-lg md:flex md:flex-col md:items-center md:p-6 md:space-y-6"
          style={{ filter: "drop-shadow(0 0 0.75rem rgba(196, 196, 196, 0.8))" }}
        >
          <p className="text-center font-bold">Won ACV mix By Cust Type</p>
  
          <div className="flex flex-wrap justify-center items-center md:flex-row md:w-full">
            <div className="w-full md:w-2/3 flex justify-center items-center">
              <BarChart />
            </div>
            <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
              <PieChart  />
            </div>
          </div>
  
          <div className="mt-12 pt-12 mb-6 flex justify-center align-middle w-full overflow-x-auto">
            <TableWithD3 />
          </div>
        </div>
      }
    </>
  );
}

export default App;
