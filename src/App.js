import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';
import ScrollToTop from './ScrollToTop';  // ← NEW LINE 1
import './styles/components.css';
import About from './components/about';
import Contact from './components/contact';
import PrivacyPolicy from './components/Privacy';
import TermsOfService from './components/terms';
const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sorting" element={<Sorting />} />
                        <Route path="/searching" element={<Searching />} />
                        <Route path="/data-structures" element={<DataStructures />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms" element={<TermsOfService/>}></Route>
                        <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
                    </Routes>
                </main>
                <Footer />
                <ScrollToTop />  {/* ← NEW LINE 2 */}
            </div>
        </Router>
    );
};

export default App;