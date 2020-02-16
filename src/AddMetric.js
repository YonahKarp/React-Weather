import React, { Component } from 'react'
import { connect } from 'react-redux'

import './scss/pages/addMetric'

import { setCurrentScreen, addNewMetric, updateMetric} from './redux/actions'


export class AddMetric extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
		this.addNewMetric = this.addNewMetric.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.metric){
            this.setState({
                ...nextProps.metric
            })
        }

    }
    
    close() {
        this.setState({name: ''})
        this.props.setCurrentScreen('Home')
    }

    save() {
        this.addNewMetric()
        this.close()
    }

    update() {
        let updatedMetric = {...this.state}
        this.props.onUpdateMetrix(updatedMetric)

        this.props.onUpdateMetrix(updatedMetric)
        this.close();
    }

    addNewMetric(){
		let newMetric = {
			id: uuid(),
			...this.state
		}
		this.props.onAddNewMetric(newMetric);
	}

    render() {
        return (
            <div className={`addEdit ${this.props.currentScreen} prev-${this.props.lastScreen}`}>
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
                    <input type="text" placeholder="New Metric" value={this.state.name} onChange={(ev)=> this.setState({name: ev.target.value})}/>
                </div>
                <div className="temp"> 

                </div>
            </div>
        )
    }
}

const uuid = () => {
	return (Date.now() + Math.random()+"").replace('.', 7)
}

const mapStateToProps = (state) => ({
    currentScreen: state.currentScreen,
    lastScreen: state.lastScreen

})

const mapDispatchToProps= (dispatch) => {
    return {
        setCurrentScreen: (screenName) => {
            dispatch(setCurrentScreen(screenName))
        },

        onAddNewMetric: (metric) => {
			dispatch(addNewMetric(metric))
        },
        
        onUpdateMetrix: (updatedMetric) => {
			dispatch(updateMetric(updatedMetric))
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMetric)
