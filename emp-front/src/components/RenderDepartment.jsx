import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const dummyEmployees = [
    {
      id: 1,
      name: "John Doe",
      currentlyWorking: true,
      salary: 75000,
      resigned: false,
      projectsContributed: ["Project A", "Project B", "Project C"],
      yearsOfExperience: 5,
      attendance: "90%",
      age: 30,
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      currentlyWorking: false,
      salary: 80000,
      resigned: true,
      projectsContributed: ["Project D", "Project E"],
      yearsOfExperience: 8,
      attendance: "85%",
      age: 35,
      gender: "Female",
    },
    {
      id: 3,
      name: "Michael Johnson",
      currentlyWorking: true,
      salary: 70000,
      resigned: false,
      projectsContributed: ["Project F", "Project G"],
      yearsOfExperience: 6,
      attendance: "95%",
      age: 28,
      gender: "Male",
    },
    {
      id: 4,
      name: "Emily Davis",
      currentlyWorking: true,
      salary: 85000,
      resigned: false,
      projectsContributed: ["Project H", "Project I", "Project J"],
      yearsOfExperience: 7,
      attendance: "92%",
      age: 32,
      gender: "Female",
    },
    {
      id: 5,
      name: "Daniel Brown",
      currentlyWorking: false,
      salary: 72000,
      resigned: true,
      projectsContributed: ["Project K"],
      yearsOfExperience: 4,
      attendance: "88%",
      age: 27,
      gender: "Male",
    },
    {
      id: 6,
      name: "Olivia Wilson",
      currentlyWorking: true,
      salary: 78000,
      resigned: false,
      projectsContributed: ["Project L", "Project M"],
      yearsOfExperience: 9,
      attendance: "91%",
      age: 34,
      gender: "Female",
    },
    {
      id: 7,
      name: "Alexander Martinez",
      currentlyWorking: true,
      salary: 80000,
      resigned: false,
      projectsContributed: ["Project N", "Project O"],
      yearsOfExperience: 7,
      attendance: "89%",
      age: 31,
      gender: "Male",
    },
    {
      id: 8,
      name: "Sophia Garcia",
      currentlyWorking: false,
      salary: 74000,
      resigned: true,
      projectsContributed: ["Project P"],
      yearsOfExperience: 6,
      attendance: "93%",
      age: 29,
      gender: "Female",
    },
    {
      id: 9,
      name: "James Rodriguez",
      currentlyWorking: true,
      salary: 76000,
      resigned: false,
      projectsContributed: ["Project Q", "Project R"],
      yearsOfExperience: 8,
      attendance: "94%",
      age: 33,
      gender: "Male",
    },
    {
      id: 10,
      name: "Isabella Thompson",
      currentlyWorking: true,
      salary: 79000,
      resigned: false,
      projectsContributed: ["Project S", "Project T", "Project U"],
      yearsOfExperience: 5,
      attendance: "87%",
      age: 26,
      gender: "Female",
    },
    {
        id: 11,
        name: "John Doe",
        currentlyWorking: true,
        salary: 75000,
        resigned: false,
        projectsContributed: ["Project A", "Project B", "Project C"],
        yearsOfExperience: 5,
        attendance: "90%",
        age: 30,
        gender: "Male",
      },
      {
        id: 12,
        name: "Jane Smith",
        currentlyWorking: false,
        salary: 80000,
        resigned: true,
        projectsContributed: ["Project D", "Project E"],
        yearsOfExperience: 8,
        attendance: "85%",
        age: 35,
        gender: "Female",
      },
      {
        id: 13,
        name: "Michael Johnson",
        currentlyWorking: true,
        salary: 70000,
        resigned: false,
        projectsContributed: ["Project F", "Project G"],
        yearsOfExperience: 6,
        attendance: "95%",
        age: 28,
        gender: "Male",
      },
      {
        id: 14,
        name: "Emily Davis",
        currentlyWorking: true,
        salary: 85000,
        resigned: false,
        projectsContributed: ["Project H", "Project I", "Project J"],
        yearsOfExperience: 7,
        attendance: "92%",
        age: 32,
        gender: "Female",
      },
      {
        id: 15,
        name: "Daniel Brown",
        currentlyWorking: false,
        salary: 72000,
        resigned: true,
        projectsContributed: ["Project K"],
        yearsOfExperience: 4,
        attendance: "88%",
        age: 27,
        gender: "Male",
      },
      {
        id: 16,
        name: "Olivia Wilson",
        currentlyWorking: true,
        salary: 78000,
        resigned: false,
        projectsContributed: ["Project L", "Project M"],
        yearsOfExperience: 9,
        attendance: "91%",
        age: 34,
        gender: "Female",
      },
      {
        id: 17,
        name: "Alexander Martinez",
        currentlyWorking: true,
        salary: 80000,
        resigned: false,
        projectsContributed: ["Project N", "Project O"],
        yearsOfExperience: 7,
        attendance: "89%",
        age: 31,
        gender: "Male",
      },
      {
        id: 18,
        name: "Sophia Garcia",
        currentlyWorking: false,
        salary: 74000,
        resigned: true,
        projectsContributed: ["Project P"],
        yearsOfExperience: 6,
        attendance: "93%",
        age: 29,
        gender: "Female",
      },
      {
        id: 19,
        name: "James Rodriguez",
        currentlyWorking: true,
        salary: 76000,
        resigned: false,
        projectsContributed: ["Project Q", "Project R"],
        yearsOfExperience: 8,
        attendance: "94%",
        age: 33,
        gender: "Male",
      },
      {
        id: 20,
        name: "Isabella Thompson",
        currentlyWorking: true,
        salary: 79000,
        resigned: false,
        projectsContributed: ["Project S", "Project T", "Project U"],
        yearsOfExperience: 5,
        attendance: "87%",
        age: 26,
        gender: "Female",
      },
  ];

function Spinner() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-60 w-60 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

function Department() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("Type");
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmployees(dummyEmployees);
      setLoading(false);
    }, 2000); // Simulating delay, adjust as needed
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = (updatedEmployee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-black text-white text-3xl justify-center p-5 rounded-md italic">
        <div className="flex-grow pl-16">
          <p className="text-center">{type} Department</p>
        </div>

        {/* Button to navigate back to Home page */}
        <button
          className="ml-auto bg-transparent hover:bg-blue-700 text-blue-500 font-bold py-2 px-2 rounded flex items-center text-sm"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          Back to Home
        </button>
      </div>


      {selectedEmployee && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md w-1/2 animate-fade-in">
            <h2 className="text-lg font-bold mb-3">Edit Employee</h2>
            <form>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedEmployee.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  value={selectedEmployee.salary}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      salary: e.target.value,
                    })
                  }
                  placeholder="Enter salary"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Projects Contributed
                </label>
                <input
                  type="text"
                  value={selectedEmployee.projectsContributed.join(", ")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                  placeholder="Projects contributed"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={selectedEmployee.yearsOfExperience}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      yearsOfExperience: e.target.value,
                    })
                  }
                  placeholder="Years of experience"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Attendance
                </label>
                <input
                  type="text"
                  value={selectedEmployee.attendance}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                  placeholder="Attendance"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={selectedEmployee.age}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      age: e.target.value,
                    })
                  }
                  placeholder="Age"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <input
                  type="text"
                  value={selectedEmployee.gender}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                  placeholder="Gender"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSave(selectedEmployee)}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className={`overflow-x-auto p-5 m-5 animate-fade-in`}>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">SOEID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Currently Working
                </th>
                <th className="border border-gray-300 px-4 py-2">Salary</th>
                <th className="border border-gray-300 px-4 py-2">Resigned</th>
                <th className="border border-gray-300 px-4 py-2">
                  Projects Contributed
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Years of Experience
                </th>
                <th className="border border-gray-300 px-4 py-2">Attendance</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.currentlyWorking ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.resigned ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.projectsContributed.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.yearsOfExperience}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.attendance}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{employee.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Department;
