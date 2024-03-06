import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Admin, Blacklist, Home, Guide, Profile, Ticket } from './views';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route
          path="login"
          element={<Navigate to="https://api.studycorp.fr/api/auth" />}
        />
        <Route path="blacklist" element={<Blacklist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="guide" element={<Guide />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
