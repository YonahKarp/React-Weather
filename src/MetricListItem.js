import React, { Component } from 'react'
import { connect } from 'react-redux'

import Swipeout from 'rc-swipeout';
import { deleteMetric, setIndex, setCurrentScreen, setMetricToUpdate} from './redux/actions'



export class MetricListItem extends Component {

    constructor(props) {
		super(props);
		
        this.deleteMetric = this.deleteMetric.bind(this);

    }
    
    deleteMetric(id){
		this.props.onDeleteMetric(id);
    }

    render() {
        return (
            <div className="metric">
                <Swipeout
                    right={[
                        {
                            text: 'edit',
                            onPress:() => {
                                console.log("edit")
                                this.props.onSetCurrentScreen("EditMetric")
                                this.props.onSetMetricToUpdate(this.props.metric)
                            },
                            style: { backgroundColor: 'grey', color: 'white' },
                            className: 'editBtn'
                        },
                        {
                            text: 'delete',
                            onPress:() => this.deleteMetric(this.props.metric.id),
                            style: { backgroundColor: 'red', color: 'white' },
                            className: 'deleteBtn'
                        }
                    ]}
                    onOpen={() => console.log('open')}
                    onClose={() => console.log('close')}
                    >
                    <div> {this.props.metric.name}</div>
                </Swipeout>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

	selectedIndex: state.selectedIndex
})

const mapDispatchToProps = (dispatch) => {
	return {
		onSetIndex: (index) => {dispatch(setIndex(index))},
        onDeleteMetric: (id) => {dispatch(deleteMetric(id))},    
        onSetCurrentScreen: (screenName) => {dispatch(setCurrentScreen(screenName))},
        onSetMetricToUpdate: (metricToUpdate) => {dispatch(setMetricToUpdate(metricToUpdate))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricListItem)
