import React, { Component } from 'react'
import { connect } from 'react-redux'

import {setActiveWeather} from './actions'

import './css/timeline.css';

export class Timeline extends Component {
    render() {
        var stripes = this.buildStripes(),
            hours = this.props.hourly.data.slice(0,24);
        return (
            <div className="timeline">
                <div className="stripes flex">
                    {
                        stripes.map((e, i)=>
                            <div key={"stripe-"+i}  className={"stripe " + e.summary}
                                style={{flexGrow: e.count, flexBasis: e.count}}
                                onClick={() => this.props.onStripeClick.call(this, e.weatherData)}
                            >
                                {e.count > 3 ? 
                                    e.summary : ""
                                } 
                            </div>
                        )
                    }
                </div>
                <div className="ticks flex">
                    {hours.map((e, i)=>
                        <div key={"tick-"+i} className={"tick " + (i % 2 == 0 ? "even" : "odd")}></div>
                    )}
                </div>
                <div className="hours semibold flex">
                    {hours.map((e, i)=>
                        <div key={"hour-"+i} className="hour">
                            {i % 2 == 0 ?
                                new Date(e.time*1000).toLocaleString('en-US', { hour: 'numeric', hour12: true }).toLowerCase().replace(" ","") : ""
                            }
                        </div>
                    )}
                </div>
                <div className="temps font18 flex">
                    {hours.map((e, i)=>
                        <div key={"temp-"+i} className="temp">
                            {i % 2 == 0 ?
                                Math.round(e.temperature) + "°" : ""
                            }
                        </div>
                    )}
                </div>

            </div>
        )
    }

    buildStripes(){
        var stripes = [],
            lastStatus = {count: 0, summary: "", weatherData: {}},
            next24Hours = this.props.hourly.data.slice(0,24);

            for (let i = 0; i < next24Hours.length; i++) {
                const e = next24Hours[i];
                if(e.summary === lastStatus.summary)
                    lastStatus.count++;
                else{
                    var lastStatus = {count: 1, summary: e.summary, weatherData: e}
                    stripes.push(lastStatus)
                }
            }
        
        return stripes
    }
}

const mapStateToProps = (state) => ({
    hourly: state.weatherData.hourly || {data: [{}]}
})

const mapDispatchToProps = (dispatch) => {
	return {
		onStripeClick: function(weather) {
            dispatch(setActiveWeather(weather));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
