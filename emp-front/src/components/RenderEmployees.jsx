import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmpTools from './EmpTools';

// Sample data for demonstration
const dummyEmployees = [
  {
    employee_Id: 1,
    first_Name: 'Michael',
    last_Name: 'Brown',
    age: 32,
    gender: 'Male',
    salary: 85000,
    start_Date: '2020-02-20',
    end_Date: null,
  },
];

const Spinner = () => {
  return (
    <div className='w-screen h-screen flex justify-center'>

      <svg
        className="animate-spin h-24 w-24 mr-3 text-blue-500 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291A8.004 8.004 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
        ></path>
      </svg>

    </div>
    
  );
};

function RenderEmployees() {
  const [sideToggle, setsideToggle] = useState(false);
  const [darkToggle, setdarkToggle] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('Type');

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false); // State to manage add form visibility
  const [searchValue,setsearchValue]=useState("");

  useEffect(() => {
    // Simulating delay to fetch data
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees.');
        }

        const data = await response.json();
        setEmployees(data || dummyEmployees); // Use dummy data if API returns null
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false); // Ensure loading state is set to false
      }
    }, 2000); // Adjust delay as needed
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = async (updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${updatedEmployee.employee_Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee.');
      }

      const updatedEmployeeData = await response.json();
      const updatedEmployees = employees.map((emp) =>
        emp.employee_Id === updatedEmployeeData.employee_Id ? updatedEmployeeData : emp
      );

      setEmployees(updatedEmployees); // Update state with modified employee
      setSelectedEmployee(null); // Clear selected employee after update
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle error scenarios (e.g., show error message to user)
    }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowAddForm(false); // Close add form on cancel
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee.');
      }

      const updatedEmployees = employees.filter((emp) => emp.employee_Id !== employeeId);
      setEmployees(updatedEmployees); // Update state after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle error scenarios (e.g., show error message to user)
    }
  };

  const handleAddNewEmployee = () => {
    setShowAddForm(true); // Show add form on button click
  };

  const handleSubmitNewEmployee = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target); // Get form data
    const newEmployee = {
      first_Name: formData.get('first_Name'),
      last_Name: formData.get('last_Name'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      salary: formData.get('salary'),
      start_Date: formatDate(formData.get('start_Date')), // Format start date
      end_Date: formData.get('end_Date') ? formatDate(formData.get('end_Date')) : null, // Format end date or set to null
    };

    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to add new employee.');
      }

      const addedEmployee = await response.json();
      setEmployees([...employees, addedEmployee]); // Add new employee to state
      setShowAddForm(false); // Hide add form after successful addition
    } catch (error) {
      console.error('Error adding new employee:', error);
      // Handle error scenarios (e.g., show error message to user)
    }
  };

  // Function to format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  function changeSearchValue(event){
      setsearchValue(event.target.value);
  }

  async function filterEmployees(){
    try {
      const response = await fetch(`http://localhost:8080/api/employees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employee.');
      }

      const filteredEmployeeData = await response.json();


      const filter_result=filteredEmployeeData.filter((data)=>{
          if ((data.employee_Id+data.first_Name+data.last_Name+data.gender).includes(searchValue)){
            return true;
            
          }else{
            return false;
          }
      })

      setEmployees(filter_result); // Update state with modified employee
      setSelectedEmployee(null); // Clear selected employee after update
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle error scenarios (e.g., show error message to user)
    }
  }

  return (
    <div id="table-container" className="flex flex-col">
      <div className="dark:bg-blue-950 w-full h-24 flex items-center justify-around bg-blue-300 text-black text-3xl p-5 rounded-b-3xl">
        <p className="dark:text-white italic">{type} Department </p>
        <EmpTools sideToggle={sideToggle} setsideToggle={setsideToggle} darkToggle={darkToggle} setdarkToggle={setdarkToggle} />

        <button onClick={() => (window.location.href = '/')} className="bg-green-500 text-white hover:bg-green-600 rounded-lg p-2 text-sm">
          Go back to home page
        </button>

        {/* Button to Add New Employee */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded m-2 p-2 text-sm" onClick={handleAddNewEmployee}>
          Add New Employee
        </button>
      </div>



      {/* Selected Employee Form */}
      {selectedEmployee && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md w-1/2 animate-fade-in">
            <h2 className="text-lg font-bold mb-3 text-center">Edit Employee</h2>
            <form>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={`${selectedEmployee.first_Name} ${selectedEmployee.last_Name}`}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Age</label>
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
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <input
                  type="text"
                  value={selectedEmployee.gender}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Salary</label>
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
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="text"
                  value={selectedEmployee.start_Date}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="text"
                  value={selectedEmployee.end_Date}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                  readOnly
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleSave(selectedEmployee)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Employee Form */}
      {showAddForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md w-1/2 animate-fade-in">
            <h2 className="text-lg font-bold mb-3 text-center">Add New Employee</h2>
            <form onSubmit={handleSubmitNewEmployee}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_Name"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_Name"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <input
                  type="text"
                  name="gender"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="text"
                  name="start_Date"
                  required
                  placeholder="YYYY-MM-DD"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="text"
                  name="end_Date"
                  placeholder="Leave empty if still employed"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div class="w-screen h-16 p-4 m-4 flex items-center justify-around"><input onChange={changeSearchValue} className='w-3/5 p-5 m-4 h-14 bg-slate-200 rounded-md' placeholder="Enter Employee Search Key " value={searchValue} ></input><button class="bg-red-400 text-white text-md rounded-xl p-2 m-2"  onClick={filterEmployees}>Search</button></div>

      {/* Employee Table */}
      <div className="overflow-x-auto m-5 rounded-xl">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="w-full bg-blue-400 text-white ">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Age</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Gender</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Salary</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Start Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">End Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <Spinner /> {/* Display spinner while loading */}
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.employee_Id} className="border-b border-gray-200 dark:border-gray-600 dark:text-white">
                  <td className="py-3 px-4">{`${employee.first_Name} ${employee.last_Name}`}</td>
                  <td className="py-3 px-4">{employee.age}</td>
                  <td className="py-3 px-4">{employee.gender}</td>
                  <td className="py-3 px-4">{employee.salary}</td>
                  <td className="py-3 px-4">{employee.start_Date}</td>
                  <td className="py-3 px-4">{employee.end_Date || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg p-2"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-2 ml-2"
                      onClick={() => handleDelete(employee.employee_Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RenderEmployees;

