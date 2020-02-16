import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/index.scss'

import { setData, setCurrentScreen, setIndex} from './redux/actions'

import Loader from './Loader';
import Home from './Home';

import AddMetric from './AddMetric'


export class App extends Component {

	async componentDidMount() {
		await new Promise((resolve) => setTimeout(resolve,1000));
		this.props.onDataFetched()
	}

	constructor(props) {
		super(props);

		this.undoEdit = this.undoEdit.bind(this);
	}

	

	undoEdit(){
		console.log("undo")
		if(this.props.selectedIndex != -1){
			this.props.onSetIndex(-1)
		}
	}

	render() {
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
			<div className="appContainer" onPointerDown={this.undoEdit}>
				<div className="appHeader">Life Metrix</div>
				{this.props.doneLoading && <CurrentScreen/>}
				{!this.props.doneLoading && <Loader/>}
				<AddMetric metric={this.props.metricToUpdate}/>

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
		onDataFetched: (data) => {
			dispatch(setData(data))
		},

		onSetCurrentScreen: (screenName) => {
			dispatch(setCurrentScreen(screenName))
		},

		onSetIndex: (index) => {
			dispatch(setIndex(index))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

