import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function HomePage() {
  const [Sectors, setSectors] = useState([]);
  const navigate=useNavigate();



  function exploreDepartment(event) {                                                   //Function to handle sector clicks
    console.log(event.target.textContent); // Log sector name on click
    const ChosenDepartment=event.target.textContent;
    navigate("/Department?Type="+ChosenDepartment);
  }
  
  function SectorCard({ sector, index }) {
    return (
      <div
        key={index}
        onClick={exploreDepartment}
        className="dark:text-white dark:bg-gray-700 sector-card flex-wrap hover:bg-gray-900 hover:text-white hover:w-1/2 flex flex-row w-1/3 h-1/3 bg-gray-300 text-3xl p-5 m-5 border-2 rounded-3xl items-center justify-center font-sans transition-all duration-500 italic font-bold backdrop-blur-3xl shadow-2xl"
      >
        {sector}
      </div>
    );
  }




  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(() => {
      const sectorsData = ["IT", "Finance", "HR", "Others"];  //API request to get this data GetSectors HTTP GET GetSectors
      setSectors(sectorsData);
    }, 500);
  }, []);

  return (
    <div className="dark:bg-zinc-500 h-screen md:w-4/5 bg-gray-100 flex flex-row p-5">
      {Sectors.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-blue-900"></div>
        </div>
      ) : (
        Sectors.map((sector, index) => (
          <SectorCard key={index} sector={sector} index={index} />
        ))
      )}
    </div>
  );
}

export default HomePage;
