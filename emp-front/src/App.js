
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RenderDepartment from './components/RenderDepartment';
import Error from './components/Error';

function App(){
  return <Router>
    <Routes>
      <Route path="/" Component={LandingPage}/>
      <Route path="/Department" Component={RenderDepartment}/>
      <Route path="*" Component={Error}/>
    </Routes>
  </Router>
}

export default App; 