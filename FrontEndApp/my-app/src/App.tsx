import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/LoginPage';
import ProgramList from './Programs/ProgramList';
import ProjectList from './Programs/ProjectList'
import JobsList from './Programs/JobsList'
import AddKind from './Programs/AddKind';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/programs" element={<ProgramList />} />
        <Route path="/programs/:id/project" element={<ProjectList />} />
        <Route path = "/programs/:id/project/:projectid/jobs" element= {<JobsList />} />
        <Route path = "/programs/:id/project/:projectid/jobs/add" element= {<AddKind />} />
      </Routes>
    </Router>
  );
}

export default App;
