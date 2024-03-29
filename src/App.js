import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/index.css'

import { setData } from './actions'
import { mockData } from './MockData'
import CurrentWeather from './CurrentWeather';
import InfoBar from './infoBar';
import MoreInfo from './MoreInfo';

import Timeline from './Timeline';
import Forecast from './Forecast';
import { Loading } from './Loader'


let API = "https://darksky-weather-server.herokuapp.com/";

export class App extends Component {

	componentDidMount() {

		// this.props.onDataFetched(mockData)

		fetch(API)
			.then((res) => res.json())
			.then(json => {
				this.props.onDataFetched(json)
				
			}).catch(() => {
				console.log("data failed")
				this.props.onDataFetched(mockData)
			});
	}

	render() {

		return (
			<div>
				{this.props.doneLoading && <div>
					<InfoBar/>
					<CurrentWeather />
					<MoreInfo/>
					<Timeline/>
					<Forecast/>
					<div className="attribution">Powered by Dark Sky</div>
				</div>}
				{!this.props.doneLoading && <Loading/>}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    doneLoading: state.doneLoading
})

const mapDispatchToProps = (dispatch) => {
	return {
		onDataFetched: (data) => {
			dispatch(setData(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

