import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Deployments from './pages/Deployments';
import Incidents from './pages/Incidents';
import LogAnalyzer from './pages/LogAnalyzer';
import Monitoring from './pages/Monitoring';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="deployments" element={<Deployments />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="analyzer" element={<LogAnalyzer />} />
          <Route path="monitoring" element={<Monitoring />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
