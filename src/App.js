import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/sorting" component={Sorting} />
                        <Route path="/searching" component={Searching} />
                        <Route path="/data-structures" component={DataStructures} />
                    </Switch>
                </main>
                <footer className="footer-container">
                    <div className="footer-content">
                        <p>© 2024 AlgoVisualizer. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
