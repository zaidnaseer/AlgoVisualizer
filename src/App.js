import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sorting" element={<Sorting />} />
                        <Route path="/searching" element={<Searching />} />
                        <Route path="/datastructures" element={<DataStructures />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
