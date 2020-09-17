import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../models/auth';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: null,
            submitted: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const payload = {
            email: this.state.email,
            password: this.state.password
        }

        event.preventDefault();

        fetch(`http://localhost:1337/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
                if (res.error) {
                    this.setState({error: `${res.error.title}: ${res.error.detail}`});
                } else if (res.token) {
                    auth.user = this.state.email;
                    auth.token = res.token;
                    this.props.updateUser();
                    this.setState({submitted: true});
                }
            },
        );
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]:value});
    }

    render() {
        const {submitted, error} = this.state;

        if (submitted) {
            return <Redirect to='/reports' />;
        }
        return (
            <section>
                <div className="Section-div">
                    <h2>Log in</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                        <br/>
                        <input
                            className="Submit-button"
                            type="submit"
                            name="submit"
                            value="Log in"
                        />
                    </form>
                    {error ? <p className="Error-msg">{error}</p> : ""}
                </div>
            </section>
        );
    }
}

export default Login;
