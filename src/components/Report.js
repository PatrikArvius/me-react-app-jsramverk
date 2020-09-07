import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

class Report extends Component {
    constructor(props) {
        super(props)

        this.state = {md: null, id: null};
    }

    componentDidMount() {
        this.getMarkdown();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.id) {
            this.getMarkdown();
        }
    }

    async getMarkdown() {
        const file = await import(`../markdown/reports/week${this.props.match.params.id}.md`);

        await fetch(file.default)
            .then(response => response.text())
            .then(text => {
                this.setState({ md: text, id: this.props.match.params.id })
            })
    }

    render() {
        return (
            <section>
                <div className="Markdown-div">
                    <ReactMarkdown source={this.state.md} escapeHtml={false} />
                </div>
            </section>
        );
    }
}

export default Report;
