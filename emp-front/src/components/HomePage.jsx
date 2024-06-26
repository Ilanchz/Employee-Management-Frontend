import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  function exploreDepartment(departmentName) { // Function to handle sector clicks
    console.log(departmentName); // Log department name on click
    navigate("/Department?Type=" + departmentName);
  }

  function SectorCard({ department, index }) {
    return (
      <div
        key={index}
        onClick={exploreDepartment}
         className="sector-card 
                    flex-wrap 
                    hover:bg-neutral-500 
                    hover:text-white 
                    hover:w-1/2 
                    flex flex-row 
                    w-1/3 h-1/3 
                    bg-gray-300 
                    text-3xl p-5 m-5 border-2 rounded-3xl 
                    items-center 
                    justify-center 
                    font-sans transition-all duration-500 italic font-bold 
                    backdrop-blur-3xl shadow-2xl"
      >
        <div className="text-3xl mb-4">{department.dept_Name}</div>
        <div>Total Employees: {department.total_Employees}</div>
        <div>Total Cost: ${department.total_Cost.toLocaleString()}</div>
      </div>
    );
  }

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(async () => {
      const response = await fetch("http://localhost:8080/api/departments", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);

      setDepartments(data);
    }, 500);
  }, []);

  return (
    <div className="dark:bg-zinc-500 h-screen md:w-4/5 bg-gray-100 flex flex-wrap p-5">
      {departments.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-blue-900"></div>
        </div>
      ) : (
        departments.map((department, index) => (
          <SectorCard key={index} department={department} index={index} />
        ))
      )}
    </div>
  );
}

export default HomePage;
