import React, { Component } from 'react'
import { connect } from 'react-redux'

import './scss/pages/addMetric'
import MoveTo from './components/MoveTo'


import { setCurrentScreen, addNewMetric, updateMetric, deleteMetric} from './redux/actions'
import { CSSTransition } from 'react-transition-group';



export class AddMetric extends Component {
    _this = this;
    
    constructor(props) {
        super(props);

        const metric = props.metric ? 
            {...props.metric} : {
                name: '',
                tagName: 'Home',
                type: ''
            }
        
        this.state = {
            metric: metric,
            showMoveTo: false
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.addNewMetric = this.addNewMetric.bind(this);
        this.delete = this.delete.bind(this);

    }

    close() {
        this.setState({name: ''})
        this.props.setCurrentScreen(this.props.lastScreen)
    }

    save() {
        this.addNewMetric()
        this.close()
    }

    update() {
        let updatedMetric = {...this.state.metric}
        this.props.onUpdateMetrix(updatedMetric)

        this.props.onUpdateMetrix(updatedMetric)
        this.close();
    }

    delete() {
        this.props.onDeleteMetric(this.state.metric.id)
        this.close()
    }

    addNewMetric(){
		let newMetric = {
			id: uuid(),
			...this.state.metric
		}
		this.props.onAddNewMetric(newMetric);
    }
    
    tagsChange(ev) {
        console.log(ev)
    }

    tagsKeyPress(ev) {
        if(!ev.target.value && ev.keyCode == 8)
            console.log( "highlight/remove last tag");
    }

    render() {
        const _this = this
        return (
            <div className={`addEdit fullPanel ${this.props.currentScreen} prev-${this.props.lastScreen}`}>
                {(this.props.currentScreen == "AddMetrix" || this.props.lastScreen =="AddMetrix") && <div className="header addHeader">
                    <div onClick={this.close}>
                        Cancel
                    </div>
                    <div onClick={this.save}>
                        Save
                    </div>
                </div>}
                {(this.props.currentScreen == "EditMetric" || this.props.lastScreen == "EditMetric") && <div className="header editHeader">
                    <div onClick={this.update}>
                        &lt; Back
                    </div>
                    <div>
                        ?
                    </div>
                </div>}
                <div className="metricName">
                    <span className="icon icon-meter"></span>
                    <input type="text" placeholder="New Metric" value={this.state.metric.name} 
                        onChange={(ev)=> this.setState({metric: { 
                            ...this.state.metric,
                            name: ev.target.value
                        }})}
                        />
                </div>
                <div className="temp"> 

                </div>
                <div className="listContainer">
                    <div className="display-ib" onClick={()=> this.setState({showMoveTo: true})}>
                        <div className="tag">⋮{this.state.metric.tagName}</div>
                        <div className="traingle"></div>
                    </div>
                </div>

                <div className="typeContainer flex">

                    <span className="icon icon-list"></span>
                    <select required value={this.state.metric.type} defaultValue="" 
                        onChange={(ev)=>this.setState({metric: {
                            ...this.state.metric,
                            type: ev.target.value
                        }})}>
                        <option value="" disabled>Metric Type </option>
                        <option value="slider">Slider</option>
                        <option value="toggle">Toggle</option>
                        <option value="select">Multiple Choice</option>
                        <option value="number">Custom Number</option>
                        <option value="time">Time</option>
                        <option value="custom">Custom input</option>
                    </select>
                    <span className="icon-caret rotate90"></span>
                </div>

                <div className="optionsContainer">
                        
                </div>

                <div className="tagsContainer flex">
                    <span className="icon icon-tags"></span>
                    <input placeholder="Tags" onChange={this.tagsChange} onKeyUp={this.tagsKeyPress}/>

                </div>

                <div className="btn-full delete-btn" onClick={this.delete}>
                    Delete metric
                </div>

                <CSSTransition in={this.state.showMoveTo} 
					classNames={"moveTo"} timeout={500} unmountOnExit>
					<MoveTo closePanel={()=>_this.setState({showMoveTo: false})}/>
				</CSSTransition>
            </div>
        )
    }
}

const uuid = () => {
	return (Date.now() + Math.random()+"").replace('.', 7)
}

const mapStateToProps = (state) => ({
    currentScreen: state.currentScreen,
    lastScreen: state.lastScreen,

})

const mapDispatchToProps= (dispatch) => {
    return {
        setCurrentScreen: (screenName) => {dispatch(setCurrentScreen(screenName))},
        onAddNewMetric: (metric) => {dispatch(addNewMetric(metric))},
        onUpdateMetrix: (updatedMetric) => {dispatch(updateMetric(updatedMetric))},
        onDeleteMetric: (id) => {dispatch(deleteMetric(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMetric)
