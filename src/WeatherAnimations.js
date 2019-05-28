import React, { Component } from 'react'
import Rain from './Rain';

import './css/weather.css'

export class WeatherAnimation extends Component {

    render() {
        return (
            <div className="weatherAnimations">
                <div className="stars"></div>
                <div className="twinkling"></div>
                <div className="clouds"></div>
                <div className="rain"><Rain/></div>

                {/* <div className="sun">
                    <span className="sun-rays"></span>
                    <span className="sun-base"></span>
                </div> */}
                <div className="clearSky">

                    {[0,1,2,3,4,5,6,7,8].map(e =>
                        <div key={"ray" + e} className={"ray ray"+e}></div>
                    )
                    }
                </div>
            </div>
            
        )
    }
}

export default WeatherAnimation
