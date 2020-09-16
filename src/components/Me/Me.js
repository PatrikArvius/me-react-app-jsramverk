import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import parv3 from './parv3.jpg';
import './Me.css';

class Me extends Component {
    constructor() {
        super()
        this.state = {text: null};
    }

    componentDidMount() {
        this.getText();
    }

    async getText() {
        await fetch("http://localhost:1337/")
            .then(response => response.json())
            .then(response => {
                this.setState({text: response.text});
            });
    }

    render() {
        return (
            <section>
                <div className="Me-picture">
                <img src={parv3} alt="me" />
                <h2>Patrik Arvius</h2>
                </div>
                <ReactMarkdown source={this.state.text} escapeHtml={false} />
            </section>
        );
    }
}

export default Me;
