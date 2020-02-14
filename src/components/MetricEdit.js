import React, { Component } from 'react'

export default class MetricEdit extends Component {
    render() {
        return (
            <div key={`metric${i}`} className="metric metricEdit">
                <span className="number">{i+1}.</span>
                <input placeholder="name" onChange={(ev) => this.props.changeMetrix(ev, i)}></input>
                <input placeholder="weight"></input>
            </div>
        )
    }
}
