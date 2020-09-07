import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Me from './components/Me/Me';
import Reports from './components/Reports';
import Report from './components/Report';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                <Navbar />
                </header>
                <main>
                <Switch>
                    <Route exact path="/" component={Me} />
                    <Route path="/reports/week/:id" component={Report} />
                    <Route path="/reports" component={Reports} />
                </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
