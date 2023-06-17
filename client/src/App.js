import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './component/Login';
import TrainCoach from './component/TrainCoach';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './assets/CSS/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<TrainCoach />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
