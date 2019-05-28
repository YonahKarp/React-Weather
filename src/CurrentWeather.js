import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeatherAnimations from './WeatherAnimations'

import './css/current.css'

export class CurrentWeather extends Component {

    render() {
        var isCurrent = this.props.active.temperature ? true : false;

        return (
            <div className="currentWeather" data-icon={this.props.active.icon}>
                <WeatherAnimations/>

                <div className="time font18">
                    <span>{new Date(this.props.active.time*1000).toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric'})}</span>
                </div> 

                {isCurrent && <div>
                    <div className="temp">
                        <div className="currentTemp semibold">
                            <div className={'icon icon-' + this.props.active.icon}></div>

                            <span>{ Math.round(this.props.active.temperature || this.props.active.temperatureHigh)}&deg; </span>
                            <span>{this.props.active.summary}</span>
                        </div>
                        <div className="otherTempData">
                            <span className="semibold">Real-Feel </span>
                            <span>{ Math.round(this.props.active.apparentTemperature)}&deg; </span>

                            {this.props.active.temperatureHigh && <span>
                                <span className="semibold">High </span>
                                <span>{ Math.round(this.props.active.temperatureHigh)}&deg; </span>
                            </span>}

                            {this.props.active.temperatureLow && <span>
                                <span className="semibold">Low </span>
                                <span>{ Math.round(this.props.active.temperatureLow)}&deg; </span>
                            </span>}
                        </div>
                        <div className="summary font22">
                            <span>{this.props.hourly.summary}</span>
                        </div>
                    </div>     
                </div>}

                {!isCurrent &&  <div className="activeInfo">
                    <div className="temp">
                        <div className="currentTemp  semibold">
                            <div className={'icon icon-' + this.props.active.icon}></div>

                            <span className="high ">{ Math.round(this.props.active.temperatureHigh)}&deg;</span>
                            <span> / </span>
                            <span className="low">{ Math.round(this.props.active.temperatureLow)}&deg;</span>
                        </div>
                    </div>
                    <div className="otherTempData">
                        <div className="feelsLike font14">RealFeel { Math.round(this.props.active.apparentTemperatureHigh)}&deg;</div>

                        <div className="summary font22">{this.props.active.summary}</div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    active: state.active,
    hourly: state.weatherData.hourly || {data: [{}]}
})

export default connect(mapStateToProps)(CurrentWeather);
