import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="Loading">
                <div className="loader">
                    <div>Loading</div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}
