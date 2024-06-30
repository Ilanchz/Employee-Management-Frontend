import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrganisationCardPage(props) {
  const [Organisations, setOrganisations] = useState([]);
  const navigate = useNavigate();

  

  function exploreOrganisation(Organisation) { // Function to handle sector clicks
    console.log(Organisation); // Log Organisation name on click
    navigate("/Organisation?Type=" + Organisation.name);
  }

  function SectorCard({ Organisation, index }) {
    return (
      <div
        key={index}
        onClick={() => exploreOrganisation(Organisation)}
        className="dark:text-white dark:bg-gray-700 sector-card flex-wrap hover:bg-gray-900 hover:text-white hover:w-1/2 flex flex-col w-1/3 h-auto bg-gray-300 text-xl p-5 m-5 border-2 rounded-3xl items-center justify-center font-sans transition-all duration-500 italic font-bold backdrop-blur-3xl shadow-2xl"
      >
        <div className="text-3xl mb-4">{Organisation.name}</div>
        <div>Total Employees: {Organisation.total_Employees}</div>
        <div>Total Employees: {Organisation.location}</div>
        <div>Total Cost: ${Organisation.total_Cost.toLocaleString()}</div>
      </div>
    );
  }

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(async () => {
      const response = await fetch("http://localhost:8080/api/organisation", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);


      setOrganisations(data);
    }, 1000);
  }, []);

  return (
    <div className="dark:bg-zinc-500 dark:h-full md:w-11/12 bg-gray-100 flex flex-wrap p-5">
      {Organisations.length === 0 ? (
        <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-blue-900"></div>
      </div>
      ) : (
        Organisations.map((Organisation, index) => (
          <SectorCard key={index} Organisation={Organisation} index={index} />
        ))
      )}
    </div>
  );
}

export default OrganisationCardPage;
