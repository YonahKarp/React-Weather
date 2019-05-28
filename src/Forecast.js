import React, { Component } from 'react'
import { connect } from 'react-redux'

import {setActiveWeatherAndTimeline, setData} from "./actions"
import { mockData } from './MockData'

import './css/forecast.css'
import './css/icons.css'

export class Forecast extends Component {

    constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0
		};
	}

    render() {
        var days = [...this.props.daily.data];
        if(this.props.current.temperature)
            days.unshift(this.props.current)
        return (
            <div className="forecast flex">
                {days.map((e,i) => {

                    var date = new Date(e.time*1000);

                    return <div key={"day"+i} 
                            className={"forecastDay " + (i == this.state.activeIndex ? "active" : "")}
                            onClick={() => this.props.onDayClick.call(this, i, e)}>
                        
                        <div className="day semibold">
                            {i == 0 ?
                                "NOW" :
                                i== 1 ? 
                                    "TODAY" : date.toLocaleString('en-US', { weekday: 'long'}).toUpperCase()
                            }
                        </div>
                        <div className="date">
                            {date.toLocaleString('en-US', { month: 'short', day: 'numeric'})}
                        </div>
                        

                        <div className={'icon icon-' + e.icon}></div>
                        <div className="temp">
                            <span className="high">{ Math.round(e.temperatureHigh)}&deg;</span>
                            <span>/ </span>
                            <span className="low">{ Math.round(e.temperatureLow)}&deg;</span>
                        </div>
                        <div className="feelsLike font14">RealFeel { Math.round(e.apparentTemperatureHigh || e.apparentTemperature)}&deg;</div>
                        <div className="summary">{e.summary}</div>
                    </div>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    daily: state.weatherData.daily || {data: [{}]},
    current: state.weatherData.currently,
})

const mapDispatchToProps = (dispatch) => {
	return {
		onDayClick: function(index, weather) {

            if(this.state.activeIndex != index){
                this.setState({activeIndex: index});

                fetch("https://darksky-weather-server.herokuapp.com/?time="+weather.time)
                    .then((res) => res.json())
                    .then(json => {
                        dispatch(setActiveWeatherAndTimeline(weather, json.hourly));
                    }).catch(() => {
                        console.log("data failed")
                        this.props.onDataFetched(mockData)
                    });
            }
        },
        
        onDataFetched: (data) => {
			dispatch(setData(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)
