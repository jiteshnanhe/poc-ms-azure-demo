import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CreateUser from './pages/createUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </Router>
  )
}

export default App
