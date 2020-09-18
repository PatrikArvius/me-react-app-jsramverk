import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Me from './components/Me/Me';
import Reports from './components/Reports';
import Report from './components/Report';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Footer from './components/Footer/Footer';
import auth from './models/auth';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: auth.user,
            token: auth.token,
            reports: [],
            reportNumbers: []
        }
        this.updateUser = this.updateUser.bind(this);
        this.getReports = this.getReports.bind(this);
    }

    componentDidMount() {
        this.getReports();
    }

    updateUser() {
        this.setState({user: auth.user, token: auth.token});
    }

    getReports() {
        fetch(`http://localhost:1337/reports/`)
                .then(res => res.json())
                .then(
                    (res) => {
                        const num = res.data.map(report => {
                            return report.week;
                        })
                        this.setState({
                            reports: [res.data],
                            reportNumbers: num
                        });
                    }
                );
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                    <Navbar user={this.state.user} updateUser={this.updateUser} reportNumbers={this.state.reportNumbers}/>
                    </header>
                    <main>
                    <Switch>
                        <Route exact path="/" component={Me} />
                        <Route path="/reports/week/:id" component={Report}/>
                        <Route path="/reports" render={props => <Reports user={this.state.user} reports={this.state.reports} {...props} />}/>
                        <Route path="/register" component={Register} />
                        <Route path="/create" render={props => <Create user={this.state.user} token={this.state.token} getReports={this.getReports} {...props} />}/>
                        <Route path="/edit/:id" render={props => <Edit user={this.state.user} token={this.state.token} reports={this.state.reports} getReports={this.getReports} {...props} />}/>
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
