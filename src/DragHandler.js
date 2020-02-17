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
	
	componentDidMount() {
		// this.sideMenu.current.style.transform = 'translateX(100%)'
		// // this.sideMenu.current.style.transform = 'translateX(200px)'
		// this.charts.current.style.transform = 'translateX(100%)'
	}

    // dragging
	threshold = 0;
	isDragging = false;
	xStretch = 0;

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

			console.log(dx)

			if(Math.abs(dx) > this.threshold){
				if(this.props.currentScreen == "Home"){
					this.sideMenuMove(dx, x1)
				} else if(this.props.currentScreen == "Metrix"){
					const percentage = (dx/window.innerWidth)*100
					const currentTransfrom = this.charts.current.style.transform;
					const currentValue = currentTransfrom.match(/-?\d+/)[0];
					let finalValue = +currentValue + percentage;
					// let finalValue = +currentValue + dx;


					if (finalValue > 50) {
						finalValue = 100
						this.props.setCurrentScreen("Home")
						this.sideMenu.current.style.transform = 'translateX(40%)'

					} 
					if(finalValue < 0){finalValue = 0;}					
					

					// this.sideMenu.current.style.transform = `translateX(${finalValue}%)`
					this.charts.current.style.transform = `translateX(${finalValue}%)`

					this.x0 = x1
				}
			
			}
		}
	}

	touchEnd = (e) => {
		this.isDragging = false;
		if(this.props.currentScreen == "Home")
			this.sideMenuEnd()
		else if(this.props.currentScreen == "Metrix"){
			const currentTransfrom = this.charts.current.style.transform;
			const currentValue = currentTransfrom.match(/-?\d+/)[0];
	
			if(currentValue < 10){
				this.charts.current.style.transform = `translateX(0)`
	
				this.xStretch = 0;
			} else if (currentValue > 80){
				this.charts.current.style.transform = `translateX(100%)`
			}
		}
	}

	sideMenuMove(dx, x1) {
		const percentage = (dx/window.innerWidth)*100
		const currentValue = this.props.menuTransform;

		let finalValue = +currentValue + percentage;
		// let finalValue = +currentValue + dx;


		if (finalValue > 102) {finalValue = 102} 
		if(finalValue < 50){
			this.xStretch = this.xStretch - (percentage);

			console.log(Math.sqrt(this.xStretch))

			if(this.xStretch >30){
				this.props.setCurrentScreen("Metrix")
				this.props.setChartsTransform(50);
				this.charts.current.style.transform = 'translateX(50%)'

				return;
			}
			finalValue = 50 - Math.sqrt(this.xStretch);
		} else {this.xStretch = 0;}
		
		
		this.props.setMenuTransform(finalValue)
		// this.sideMenu.current.style.transform = `translateX(${finalValue}%)`

		this.x0 = x1
	}

	sideMenuEnd() {
		const currentValue = this.props.menuTransform;

		if(currentValue < 50){
			this.props.setMenuTransform(50);
			this.xStretch = 0;
		} else if (currentValue > 80){
			this.props.setMenuTransform(100);
		}
	}
}

const mapStateToProps = (state) => ({
	currentScreen: state.currentScreen,
	menuTransform: state.menuTransform,
	chartsTransfrom: state.chartsTransfrom
})

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentScreen: (screenName) => {
			dispatch(setCurrentScreen(screenName))
		},
		setMenuTransform: (screenName) => {
			dispatch(setMenuTransform(screenName))
		},
		setChartsTransform: (screenName) => {
			dispatch(setChartsTransform(screenName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DragHandler)
