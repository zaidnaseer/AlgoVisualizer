import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sorting from './pages/Sorting';
import Home from './pages/Home';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <>
            {/* Always render Header */}
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sorting" element={<Sorting />} />
                <Route path="/searching" element={<Searching />} />
                <Route path="/data-structures" element={<DataStructures />} />
            </Routes>
            {/* Always render Footer */}
            <Footer />
        </>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
