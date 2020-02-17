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

        // const metric = props.metric ? 
        //     {...props.metric} : {
        //         name: '',
        //         tagName: 'Home',
        //         type: '',
        //         tags: []
        //     }

        const metric = {
            name: '',
            tagName: 'Home',
            type: '',
            tags: [],
            ...props.metric
        }
        
        this.state = {
            metric,
            showMoveTo: false,
            tagsValue: '',
            selectTagIndex: -1
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.addNewMetric = this.addNewMetric.bind(this);
        this.delete = this.delete.bind(this);
        this.tagsChange = this.tagsChange.bind(this);
        this.tagsKeyPress = this.tagsKeyPress.bind(this);
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
        this.setState({
            tagsValue: ev.target.value,
            selectTagIndex: -1
        })
    }

    tagsKeyPress(ev) {
        let value = ev.target.value
        if(value && ev.keyCode == 13){ //enter
            this.setState({
                metric: {
                    ...this.state.metric,
                    tags: [
                        ...this.state.metric.tags,
                        value
                    ]
                },
                tagsValue: ''
            })
         } else if(!value && ev.keyCode == 8){ //backspace
            if(this.state.selectTagIndex == -1)
                this.setState({selectTagIndex: this.state.metric.tags.length -1})
            else{
                this.state.metric.tags.splice(this.state.selectTagIndex,1)
                this.setState({
                    metric: {
                        ...this.state.metric,
                        tags: [...this.state.metric.tags],
                        
                    },
                    selectTagIndex: -1
                }) 
            }
        }
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
                    <div onClick={this.update} className="back-btn">
                        <span className="icon icon-caret rotate270"></span> Back
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
                    {(this.state.metric.tags || []).map((tag, i) => <span key={`tag-${tag}`} className={`tag${this.state.selectTagIndex == i ? ' selected': ''}`}>
                        {tag}
                    </span>)}
                    <input placeholder="Tags" onChange={this.tagsChange} onKeyUp={this.tagsKeyPress} value={this.state.tagsValue}/>

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
