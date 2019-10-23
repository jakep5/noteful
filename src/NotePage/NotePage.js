import React, { Component } from 'react'
import './NotePage.css';

export default class NotePage extends Component {
    render() {
        return (
            <div>
                <header className="appTitle">
                    <h1 className="title">Noteful</h1>
                </header>
                <main>
                    <section className="mainPage"></section>
                </main>
            </div>
        )
    }
}
