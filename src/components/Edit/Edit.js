import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Edit extends Component {
    constructor() {
        super()
        this.state = {
            text: "",
            week: "",
            error: null,
            submitted: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.reports) {
            const id = parseInt(this.props.match.params.id);
            const singleReport = this.props.reports[0].filter(report => report.week === id);
            const text = singleReport[0].report_text;
            this.setState({text: text, week: id});
        }
    }

    handleSubmit(event) {
        const payload = {
            week: this.state.week,
            text: this.state.text
        }

        event.preventDefault();

        fetch(`http://localhost:1337/reports`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "x-access-token": this.props.token
            },
            body: JSON.stringify(payload)
        })
        .then((response) => response.json())
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
        const {user} = this.props;

        if (!user) {
            return <Redirect to="/login" />;
        } else if (submitted) {
            this.props.getReports();
            return <Redirect to="/reports" />;
        }
        return (
            <section>
                <div className="Section-div">
                    <h2>Edit report</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="text">Week {this.props.match.params.id}</label>
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
                            value="Edit report"
                        />
                    </form>
                    <Link to={`/reports`}>Back to reports</Link>
                    {error ? <p className="Error-msg">{error}</p> : ""}
                </div>
            </section>
        );
    }
}

export default Edit;
