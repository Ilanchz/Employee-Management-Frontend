import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  function exploreDepartment(department) {
    console.log(department);
    navigate(`/Department?Type=${department.dept_Name}`);
  }

  function SectorCard({ department, index }) {
    return (
      <div
        key={index}
        onClick={() => exploreDepartment(department)}
        className="dark:text-white dark:bg-gray-700 sector-card hover:bg-gray-900 hover:text-white hover:w-1/2 flex flex-col w-1/3 h-auto bg-gray-300 text-xl p-5 m-5 border-2 rounded-3xl items-center justify-center font-sans transition-all duration-500 italic font-bold backdrop-blur-3xl shadow-2xl"
      >
        <div className="text-3xl mb-4"><span className="text-indigo-600">{department.dept_Name}</span></div>
        <div>Total Employees: <span className="text-red-600">{department.total_Employees}</span></div>
        <div>Total Cost: <span className="text-green-800 dark:text-green-300">${department.total_Cost.toLocaleString()}</span></div>
      </div>
    );
  }

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/departments", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);

  }, []);

  return (
    <div className="dark:bg-zinc-500 dark:h-full h-full bg-gray-100 flex flex-wrap p-5">
      <div className="flex items-center justify-between w-full p-3 m-3 text-3xl text-white bg-black font-serif"><span className="self-center">Departments Tab</span><a href="/"><div className="bg-red-500 p-4 m-2 text-sm">Switch to Org</div></a></div>
      {departments.length === 0 ? (
        <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-blue-900"></div>
      </div>
      ) : (
        departments.map((department, index) => (
          <SectorCard key={index} department={department} index={index} />
        ))
      )}
    </div>
  );
}

export default DepartmentPage;
