import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/pages/metrix.scss'

import { addNewMetric, updateMetric, setIndex, setCurrentScreen} from './redux/actions'

import ListItem from './MetricListItem'
import AddMetric from './AddMetric'
import 'rc-swipeout/assets/index.css';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.sideMenu = React.createRef();

		this.state = {
			isDragging: false,
			touchStart: []
		}

		this.addNewMetric = this.addNewMetric.bind(this);
		this.updateMetrix = this.updateMetrix.bind(this);
	}

	componentDidMount() {
		this.sideMenu.current.style.transform = 'translateX(100%)'

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
				<div>Now</div>
                <div className="metrixList" ref={this.sideMenu}>
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
                
                <AddMetric/>
            </div>
		)
	}

	// dragging
	threshold = 10;
	isDragging = false;

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
				const percentage = (dx/window.innerWidth)*300
				const currentTransfrom = this.sideMenu.current.style.transform;
				const currentPercentage = currentTransfrom.match(/\d+/)[0];
				let finalPercentage = +currentPercentage + percentage;

				if(finalPercentage < 0){finalPercentage = 0;}
				if (finalPercentage > 100) {finalPercentage = 100}

				this.sideMenu.current.style.transform = `translateX(${finalPercentage}%)`
				this.x0 = x1
			}
		}
	}

	touchEnd = (e) => {
		this.isDragging = false;
	}
}



const uuid = () => {
	return (Date.now() + Math.random()+"").replace('.', 7)
}

const mapStateToProps = (state) => ({
	doneLoading: state.doneLoading,
	metrix: state.metrix,
    selectedIndex: state.selectedIndex,
    currentScreen: state.currentScreen
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

