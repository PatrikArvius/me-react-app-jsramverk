import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: null,
            submitted: false,
            message: ""
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

        fetch(`http://localhost:1337/register`, {
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
                } else if (res.msg) {
                    this.setState({message: res.msg});
                    setTimeout(() => {
                        this.setState({submitted: true});
                    }, 2000);
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
        const {submitted, error, message} = this.state;

        if (submitted) {
            return <Redirect to='/login' />;
        }

        return (
            <section>
                <div className="Section-div">
                    <h2>Register user</h2>
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
                            minLength="8"
                        />
                        <br/>
                        <input
                            className="Submit-button"
                            type="submit"
                            name="submit"
                            value="Register"
                        />
                    </form>
                    {error ? <p className="Error-msg">{error}</p> : ""}
                    {message ? <p className="Success-msg">{message}</p> : ""}
                </div>
            </section>
        );
    }
}

export default Register;
