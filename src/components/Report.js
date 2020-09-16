import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

class Report extends Component {
    constructor() {
        super()
        this.state = {
            md: null,
            id: null,
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.getReport();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.id) {
            this.getReport();
        }
    }

    async getReport() {
        await fetch(`http://localhost:1337/reports/week/${this.props.match.params.id}`)
                .then(res => res.json())
                .then(
                    (res) => {
                        this.setState({
                            md: res.data.report_text,
                            id: this.props.match.params.id,
                            isLoaded: true,
                        });
                    },
                    (error) => {
                        this.setState({
                            id: this.props.match.params.id,
                            isLoaded: true,
                            error
                        });
                    }
                );
            }

    render() {
        const {error, md} = this.state;

        if (error) {
            console.log(error);
            return <div>Error {error.message}</div>;
        }
        return (
            <section>
                <div className="Markdown-div">
                    <ReactMarkdown source={md} escapeHtml={false} />
                </div>
            </section>
        );
    }
}

export default Report;
