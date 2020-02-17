import React, { Component } from 'react'
import { connect } from 'react-redux'

import {setCurrentScreen, setChartsTransform, setMenuTransform} from './redux/actions'


export class DragHandler extends Component {
    render() {
        return (
            <div className="dragHandler" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
                {this.props.children}
            </div>
        )
	}
	
    // dragging
	threshold = 10;
	stretchThreshold = 35;
	isDragging = false;
	xStretch = 0;
	offScreen = 105

	getTap = (e) => e.changedTouches[0];

	touchStart = (e) => {
		const tap = this.getTap(e);
		this.x0 = tap.clientX

		this.isDragging = true
	}

	touchMove = (e) => {
		if(this.isDragging){ 
			const tap = this.getTap(e);
			let x1 = tap.clientX

			let dx = x1 - this.x0;
			const percentage = (dx/window.innerWidth)*100

			if(Math.abs(dx) > this.threshold){
				if(this.props.currentScreen == "Home")
					this.menuMove(percentage)
				else if(this.props.currentScreen == "Metrix")
					this.chartsMove(percentage)

				this.x0 = x1
			}
		}
	}

	touchEnd = (e) => {
		this.isDragging = false;
		if(this.props.currentScreen == "Home")
			this.menuEnd()
		else if(this.props.currentScreen == "Metrix"){
			this.chartsEnd()
		}
	}

	//menu
	menuMove(percentage) {
		const currentValue = this.props.menuTransform;
		let finalValue = +currentValue + percentage;

		if (finalValue > this.offScreen) {finalValue = this.offScreen} 
		if(finalValue < 50){
			this.xStretch = this.xStretch - (percentage);

			if(this.xStretch > this.stretchThreshold){
				this.props.setCurrentScreen("Metrix")
				this.props.setChartsTransform(50);
				this.xStretch = 0;

				return;
			}
			finalValue = 50 - (Math.sqrt(this.xStretch)|| 0);
		} else {this.xStretch = 0;}
		
		this.props.setMenuTransform(finalValue)
	}

	menuEnd() {
		const currentValue = this.props.menuTransform;

		if(currentValue < 50){
			this.props.setMenuTransform(50);
			this.xStretch = 0;
		} else if (currentValue > 80){
			this.props.setMenuTransform(this.offScreen);
		}
	}

	// charts
	chartsMove(percentage){
		const currentValue = this.props.chartsTransform;
		let finalValue = +currentValue + percentage;

		if (finalValue > 50) {
			this.xStretch = this.xStretch - (percentage);

			if(this.xStretch < -40){
				finalValue = this.offScreen
				this.props.setCurrentScreen("Home")
				this.props.setMenuTransform(40)
				this.xStretch = 0;

			}else
			finalValue = 50 + (Math.sqrt(-this.xStretch)|| 0);
		} 
		if(finalValue < 0){finalValue = 0;}					
		
		this.props.setChartsTransform(finalValue);
	}

	chartsEnd() {
		const currentValue = this.props.chartsTransform;
	
		if(currentValue < 10){
			this.props.setChartsTransform(0)

		} else if (currentValue > 50){
			this.props.setChartsTransform(50)
		}
		this.xStretch = 0;

	}
}

const mapStateToProps = (state) => ({
	currentScreen: state.currentScreen,
	menuTransform: state.menuTransform,
	chartsTransform: state.chartsTransform
})

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentScreen: (screenName) => {
			dispatch(setCurrentScreen(screenName))
		},
		setMenuTransform: (menuTransform) => {
			dispatch(setMenuTransform(menuTransform))
		},
		setChartsTransform: (chartsTransform) => {
			dispatch(setChartsTransform(chartsTransform))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DragHandler)
