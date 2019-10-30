import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class ErrorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error">
                    <h2>Could not display this page</h2>
                    <Link to="/">
                        <button className="goBackError">Return to home page</button>
                    </Link>
                </div>
            )
        }
        return this.props.children;
    }
}
