import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/pages/metrix.scss'

import { addNewMetric, updateMetric, setIndex, setCurrentScreen} from './redux/actions'

import ListItem from './MetricListItem'
import 'rc-swipeout/assets/index.css';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.sideMenu = React.createRef();
		this.charts = React.createRef();


		this.state = {
			
		}

		this.addNewMetric = this.addNewMetric.bind(this);
		this.updateMetrix = this.updateMetrix.bind(this);
	}

	componentDidMount() {
		// this.sideMenu.current.style.transform = 'translateX(100%)'
		this.sideMenu.current.style.transform = 'translateX(200px)'
		this.charts.current.style.transform = 'translateX(100%)'
	}

	undoEdit(){
		console.log("undo")
		if(this.props.selectedIndex != -1){
			this.props.onSetIndex(-1)
		}
	}
	
	addNewMetric(){
		let newMetric = {
			id: uuid(),
			name: '',
			value: ''
		}
		let metrix = this.props.metrix;

		this.props.onAddNewMetric(newMetric);
		this.setState({
			selectedIndex: metrix.length
		})
	}

	updateMetrix(ev, i, attrName){
		let updatedMetric = this.props.metrix[i];
		
		updatedMetric[attrName] = ev.target.value;
		this.props.onUpdateMetrix(updatedMetric, i);
	}

	render() {
		return (
            <div className="homePage" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
				
				<div className="checklist">Now</div>
				<div className={`charts screen-${this.props.currentScreen}`} ref={this.charts}>Now</div>


                <div className={`metrixList screen-${this.props.currentScreen}`} ref={this.sideMenu}>
                    <div className="iconsList">
                        <span className="icon icon-star-full"></span>
                    </div>
                    {this.props.metrix.map((metric, i) =>
                        this.props.selectedIndex == i ? 
                            <div key={`metric${metric.id}`} className="metric metricEdit">
                                <input value={metric.name} placeholder="name" onChange={(ev) => this.updateMetrix(ev, i, "name")} onPointerDown={(e)=>{e.stopPropagation()}}></input>
                            </div> :
                            <ListItem metric={metric} i={i} key={`metric${metric.id}`}/> 
                    )}
                </div>

                <div className="btn addBtn" onClick={()=>this.props.setCurrentScreen("AddMetrix")}>
                    <span className="icon icon-plus"></span>
                </div>                
            </div>
		)
	}

	// dragging
	threshold = 10;
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
						this.sideMenu.current.style.transform = 'translateX(50%)'

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
		const percentage = (dx/window.innerWidth)*300
		const currentTransfrom = this.sideMenu.current.style.transform;
		const currentValue = currentTransfrom.match(/-?\d+/)[0];
		let finalValue = +currentValue + percentage;
		// let finalValue = +currentValue + dx;


		if (finalValue > 100) {finalValue = 100} 
		if(finalValue < 0){
			// this.xStretch = this.xStretch - (dx);
			this.xStretch = this.xStretch - (percentage)/3;

			console.log(this.xStretch)

			if(this.xStretch >20){
				this.props.setCurrentScreen("Metrix")
				this.charts.current.style.transform = 'translateX(50%)'

				// console.log()
			}
			finalValue = 0 - Math.sqrt(this.xStretch);
		} else {this.xStretch = 0;}
		
		

		// this.sideMenu.current.style.transform = `translateX(${finalValue}%)`
		this.sideMenu.current.style.transform = `translateX(${finalValue}%)`

		this.x0 = x1
	}

	sideMenuEnd() {
		const currentTransfrom = this.sideMenu.current.style.transform;
		const currentValue = currentTransfrom.match(/-?\d+/)[0];

		if(currentValue < 0){
			this.sideMenu.current.style.transform = `translateX(0)`

			this.xStretch = 0;
		} else if (currentValue > 80){
			this.sideMenu.current.style.transform = `translateX(100%)`
		}
	}
}



const uuid = () => {
	return (Date.now() + Math.random()+"").replace('.', 7)
}

const mapStateToProps = (state) => ({
	doneLoading: state.doneLoading,
	metrix: state.metrix,
    selectedIndex: state.selectedIndex,
	currentScreen: state.currentScreen,
	metricToUpdate: state.metricToUpdate
})

const mapDispatchToProps = (dispatch) => {
	return {
		onAddNewMetric: (metric) => {
			dispatch(addNewMetric(metric))
		},

		onUpdateMetrix: (updatedMetric, i) => {
			dispatch(updateMetric(updatedMetric))
		},

		onSetIndex: (index) => {
			dispatch(setIndex(index))
		},

		setCurrentScreen: (screenName) => {
			dispatch(setCurrentScreen(screenName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

