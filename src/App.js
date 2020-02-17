import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/index.scss'

import { setData} from './redux/actions'

import Loader from './Loader';
import Home from './Home';

import AddMetric from './AddMetric'

import { CSSTransition } from 'react-transition-group';

export class App extends Component {

	async componentDidMount() {
		await new Promise((resolve) => setTimeout(resolve,1000));
		this.props.onDataFetched()
	}

	constructor(props) {
		super(props);

	}

	render() {
		const _this = this
		let CurrentScreen;

		switch(this.props.currentScreen){
			case "AddMetrix":
			case "Home":
				CurrentScreen = Home;
				break;
			default:
				CurrentScreen = Home;
		}


		return (
			<div className="appContainer">
				<div className="appHeader">Life Metrix</div>
				{this.props.doneLoading && <CurrentScreen/>}
				{!this.props.doneLoading && <Loader/>}

				<CSSTransition in={"AddMetrix" == this.props.currentScreen} 
					classNames={"add"} timeout={600} unmountOnExit>
					<AddMetric metric={_this.props.metricToUpdate}/>
				</CSSTransition>
				<CSSTransition in={"EditMetric" == this.props.currentScreen} 
					classNames={"edit"} timeout={600} unmountOnExit>
					<AddMetric metric={_this.props.metricToUpdate}/>
				</CSSTransition>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	doneLoading: state.doneLoading,
	currentScreen: state.currentScreen,
	selectedIndex: state.selectedIndex,
	metricToUpdate: state.metricToUpdate
})

const mapDispatchToProps = (dispatch) => {
	return {
		onDataFetched: (data) => {dispatch(setData(data))},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

