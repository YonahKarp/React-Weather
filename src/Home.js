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
	lastRun = Date.now();

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
				this.sideMenuMove(dx, x1)
			}
		}
	}

	touchEnd = (e) => {
		this.isDragging = false;
		if(this.props.currentScreen == "Home")
			const currentTransfrom = this.sideMenu.current.style.transform;
			const currentValue = currentTransfrom.match(/-?\d+/)[0];

			if(currentValue < 50){
				this.sideMenu.current.style.transform = `translateX(50%)`

				this.xStretch = 0;
			} else if (currentValue > 80){
				this.sideMenu.current.style.transform = `translateX(100%)`
			}
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
		const isHome = this.props.currentScreen == "Home";
		let target, other, maxPct, minPct

		if(isHome){
			target = this.sideMenu.current
			other = this.charts.current
			maxPct = 102
			minPct = 50
		} else{
			target = this.charts.current
			other = this.sideMenu.current,
			maxPct = 50
			minPct = 0
		}

		const percentage = (dx/window.innerWidth)*100
		const currentTransfrom = target.style.transform;
		const currentValue = currentTransfrom.match(/-?\d+/)[0];
		let finalValue = +currentValue + percentage;

		if (finalValue > maxPct) {
			finalValue = maxPct

			if(!isHome){
				finalValue = 100
				this.props.setCurrentScreen("Home")
				other.style.transform = 'translateX(50%)'
			}
		
		} 
		if(finalValue < minPct){
			if(isHome){
				this.xStretch = this.xStretch - (percentage);

				if(this.xStretch >35){
					this.props.setCurrentScreen("Metrix")
					other.style.transform = 'translateX(50%)'
					this.xStretch = 0
					finalValue = 0;
				}
				finalValue = 50 - Math.sqrt(this.xStretch);
			}

		} else {this.xStretch = 0;}
		
		target.style.transform = `translateX(${finalValue}%)`

		this.x0 = x1
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

