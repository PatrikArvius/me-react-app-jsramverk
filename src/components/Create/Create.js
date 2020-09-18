import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Create extends Component {
    constructor() {
        super()
        this.state = {
            week: 1,
            text: "",
            error: null,
            submitted: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        const payload = {
            week: this.state.week,
            text: this.state.text
        }

        event.preventDefault();

        fetch(`http://localhost:1337/reports`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-access-token": this.props.token
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
                if (res.error) {
                    this.setState({error: `${res.error.title}: ${res.error.detail}`});
                } else if (res.msg) {
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
        const {error, submitted} = this.state;
        const user = this.props.user;

        if (!user) {
            return <Redirect to="/login" />;
        } else if (submitted) {
            this.props.getReports();
            return <Redirect to="/reports" />;
        }
        return (
            <section>
                <div className="Section-div">
                    <h2>Create new report</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="week">Week</label>
                        <br />
                        <input
                            type="number"
                            name="week"
                            id="week"
                            value={this.state.week}
                            onChange={this.handleInputChange}
                            required
                            className="Num-input"
                            min="1"
                        />
                        <br />
                        <label htmlFor="text">Text</label>
                        <br />
                        <textarea
                            name="text"
                            id="text"
                            value={this.state.text}
                            onChange={this.handleInputChange}
                            required
                            className="Text-field"
                        />
                        <br/>
                        <input
                            className="Submit-button"
                            type="submit"
                            name="submit"
                            value="Create report"
                        />
                    </form>
                    <Link to={`/reports`}>Back to reports</Link>
                    {error ? <p className="Error-msg">{error}</p> : ""}
                </div>
            </section>
        );
    }
}

export default Create;