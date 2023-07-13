import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import TambahData from './TambahData';
import Login from './Login';
import Register from './register';
import AddPersonForm from './AddPersonForm';
import './styles.css';
import './form.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Data Penduduk Sragen</h1>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/tambahdata">TambahData</Link>
              </li>
              {/* <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li> */}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tambahdata" element={<TambahData />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />}/>
            {/* <Route exact path="/add-person" component={AddPersonForm} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
