import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../MainPage/MainPage.css'
import './ErrorComponent.css'

export default class ErrorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError (error) {
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <header className="appTitle">
                        <h1 className="title">
                            <Link to="/">Noteful</Link>
                        </h1>
                    </header>
                    <div className="error">
                        <h2>Could not display this page</h2>
                        <Link to="/">
                            <button className="goBackError">Return to home page</button>
                        </Link>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}
