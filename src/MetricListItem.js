import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setCurrentScreen, setMetricToUpdate} from './redux/actions'



export class MetricListItem extends Component {

    constructor(props) {
		super(props);
    }

    render() {
        return (
            <div className="metric">
                <span>{this.props.metric.name}</span>
                <span className="icon icon-pencil" onClick={() => {
                    this.props.onSetCurrentScreen("EditMetric");
                    this.props.onSetMetricToUpdate(this.props.metric);
                }}></span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

	selectedIndex: state.selectedIndex
})

const mapDispatchToProps = (dispatch) => {
	return {
        onSetCurrentScreen: (screenName) => {dispatch(setCurrentScreen(screenName))},
        onSetMetricToUpdate: (metricToUpdate) => {dispatch(setMetricToUpdate(metricToUpdate))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricListItem)
