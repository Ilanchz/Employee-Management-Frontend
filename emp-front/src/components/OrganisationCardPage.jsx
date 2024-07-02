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
        <div className="text-3xl mb-4 text-indigo-600">{Organisation.name}</div>
        <div>Total Employees: <span className="text-red-600">{Organisation.total_Employees}</span></div>
        <div>Total Employees: <span className="text-violet-700 dark:text-violet-300">{Organisation.location}</span></div>
        <div>Total Cost: <span className="text-green-800 dark:text-green-300">${Organisation.total_Cost.toLocaleString()}</span></div>
      </div>
    );
  }

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(async () => {

      try{
        const response = await fetch("http://localhost:8080/api/organisation", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);

        setOrganisations(data);

      }catch(err){
        alert("API request not fulfilled!");
      }
      
    }, 1000);
  }, []);

  return (
    <div className="dark:bg-zinc-500 dark:h-full md:w-11/12 bg-gray-100 flex flex-wrap p-5">
      <div className="flex items-center justify-center w-full p-3 m-3 text-3xl text-white bg-black font-serif">Organisations Tab</div>
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
