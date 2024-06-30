
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Error from './components/Error';
import RenderEmployees from './components/RenderEmployees';
import DepartmentPage from './components/DepartmentPage';
import OrganisationPage from './components/OrganisationPage';

function App(){
  return <Router>
    <Routes>
      <Route path="/" Component={OrganisationPage}/>
      <Route path="/Organisation" Component={DepartmentPage}/>
      <Route path="/Department" Component={RenderEmployees}/>
      <Route path="*" Component={Error}/>
    </Routes>
  </Router>
}

export default App; 