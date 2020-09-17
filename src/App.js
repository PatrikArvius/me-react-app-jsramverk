import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Me from './components/Me/Me';
import Reports from './components/Reports';
import Report from './components/Report';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import auth from './models/auth';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: auth.user
        }
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser() {
        this.setState({user: auth.user});
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                    <Navbar user={this.state.user} updateUser={this.updateUser}/>
                    </header>
                    <main>
                    <Switch>
                        <Route exact path="/" component={Me} />
                        <Route path="/reports/week/:id" component={Report}/>
                        <Route path="/reports" component={Reports} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" render={props => <Login updateUser={this.updateUser} {...props} />}/>
                    </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
