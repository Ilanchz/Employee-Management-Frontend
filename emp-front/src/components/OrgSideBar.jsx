import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#EE4433","#E6E6FA"];

function OrgSideBar(props) {
  const { sideToggle } = props;

  const [costData, setCostData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await fetch("http://localhost:8080/api/organisation", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
  
        const costTransformedData = data.map(org => ({
          name: org.name,
          cost: org.total_Cost
        }));
        setCostData(costTransformedData);
  
        const employeeTransformedData = data.map(org => ({
          name: org.name,
          employees: org.total_Employees
        }));
        setEmployeeData(employeeTransformedData);
      }catch(err){
        console.log("Network connection for api refused!");
      }
      
    }

    fetchData();
  }, []);

  return sideToggle ? (
    <div className="sm:w-2/5 h-full bg-gray-800 text-white rounded-3xl p-5 float-right flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold">Insights</h1>
      <h2 className="text-2xl mb-4">Cost Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={costData}
          dataKey="cost"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {costData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2 className="text-2xl mb-4">Count Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={employeeData}
          dataKey="employees"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#82ca9d"
          label
        >
          {employeeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  ) : (
    <div className="hidden"></div>
  );
}

export default OrgSideBar;
