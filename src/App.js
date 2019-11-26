import React, { Component } from 'react'
import { connect } from 'react-redux'
import './scss/index.scss'

import { setData } from './actions'
import { mockData } from './MockData'


export class App extends Component {

	async componentDidMount() {
		await new Promise((resolve) => setTimeout(resolve,1000));
		this.props.onDataFetched(mockData)
	}

	render() {

		return (
			<div>
				{this.props.doneLoading && <div>
					<div>Metrix</div>

					<div>
						Add new metric
					</div>
				</div>}
				{!this.props.doneLoading && <div className="Loading">
					<div className="loader">
						<div>Loading</div>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    doneLoading: state.doneLoading
})

const mapDispatchToProps = (dispatch) => {
	return {
		onDataFetched: (data) => {
			dispatch(setData(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

