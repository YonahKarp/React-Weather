import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/pages/home.scss'

import {setCurrentScreen} from './redux/actions'

import 'rc-swipeout/assets/index.css';
import DragHandler from './DragHandler'
import Menu from './Menu'

export class Home extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
            <div className="homePage">
				<DragHandler>
					<div className="checklist">Now</div>
					<div className={`charts fullPanel screen-${this.props.currentScreen}`} style={{transform: `translateX(${this.props.chartsTransform}%)`}}>Now</div>

					<Menu/>
				
					<div className="btn addBtn" onClick={()=>this.props.setCurrentScreen("AddMetrix")}>
						<span className="icon icon-plus"></span>
					</div>  
				</DragHandler>         
            </div>
		)
	}
}

const mapStateToProps = (state) => ({
	doneLoading: state.doneLoading,
	metrix: state.metrix,
	currentScreen: state.currentScreen,
	metricToUpdate: state.metricToUpdate,
	chartsTransform: state.chartsTransform
})

const mapDispatchToProps = (dispatch) => {
	return {

		setCurrentScreen: (screenName) => {
			dispatch(setCurrentScreen(screenName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

