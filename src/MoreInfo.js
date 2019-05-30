import React, { Component } from 'react'
import { connect } from 'react-redux'

import './css/infoBar.css'

export class infoBar extends Component {

    render() {
        return (
            <div className="moreInfo">
                <div className="info">
                    <span className="semibold">Chance of Precipitation: </span>
                    <span>{this.props.active.precipProbability*100}%</span>
                </div>
                
                <div className="info">
                    <span className="semibold">Cloud Cover: </span>
                    <span>{this.props.active.cloudCover*100}%</span>
                </div>

                <div className="info">
                    <span className="semibold">UV Index: </span>
                    <span>{this.props.active.uvIndex}</span>
                </div>

                <div className="info">
                    <span className="semibold">Visibilty: </span>
                    <span>{this.props.active.visibility}mi</span>
                </div>

                <div className="info">
                    <span className="semibold">Pressure: </span>
                    <span>{Math.round(this.props.active.pressure)}mb</span>
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => ({
    active: state.active,
})

export default connect(mapStateToProps)(infoBar)
