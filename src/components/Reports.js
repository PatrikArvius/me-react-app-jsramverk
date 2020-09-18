import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Reports extends Component {
    constructor() {
        super()
        this.state = {
            reports: null,
            error: null,
            clickedCreate: false,
        };
        this.handleCreateClick = this.handleCreateClick.bind(this);
    }

    getReportsTable(reports) {
        return <div>
                <table>
                    <thead>
                        <tr>
                            <th className="Week-td">Week</th>
                            <th>Text</th>
                            <th className="Option-td">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => {
                            return <tr key={report.week}>
                                        <td className="Week-td">{report.week}</td>
                                        <td>{report.report_text}</td>
                                        <td>{<Link to={`/edit/${report.week}`}>Edit</Link>}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
                <input
                className="Submit-button"
                type="button"
                value="Create report"
                onClick={this.handleCreateClick}
            />
            </div>
    }

    handleCreateClick() {
        this.setState({clickedCreate: true});
    }

    render() {
        const {error, clickedCreate} = this.state;
        const {user, reports} = this.props;

        if (clickedCreate) {
            return <Redirect to="/create" />;
        }
        return (
            <section>
                <h1>Rapporter</h1>
                <p>Hej och välkommen till min sida för rapporter, vänligen välj den vecka vars 
                    rapport du är intresserad av från den dropdown som dyker upp då du hovrar 
                    över "Reports" i navigationen.
                </p>
                {error ? <p className="Error-msg">{error}</p> : ""}
                {(user && reports) ? this.getReportsTable(reports[0]) : ""}
            </section>
        );
    }
}

export default Reports;
