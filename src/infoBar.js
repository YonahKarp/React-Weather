import React, { Component } from 'react'
import { connect } from 'react-redux'

import './css/infoBar.css'

export class infoBar extends Component {

    render() {
        return (
            <div className="infoBar flex">
                <div className="info">
                    <span className="semibold">Wind: </span>
                    <span>{this.props.active.windSpeed} mph</span>
                </div>

                <div className="info">
                    <span className="semibold">Humidity: </span>
                    <span>{Math.round(this.props.active.humidity*100)}%</span>
                </div>

                <div className="info">
                    <span className="semibold">Dew Point: </span>
                    <span>{Math.round(this.props.active.dewPoint)}&deg;</span>
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => ({
    active: state.active,
})

export default connect(mapStateToProps)(infoBar)
