import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DentistList from './pages/DentistList';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-4 pb-10">
        <Routes>
          <Route path="/" element={<DentistList />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

