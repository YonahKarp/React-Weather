import React, { Component } from 'react'
import { connect } from 'react-redux'

import ListItem from './MetricListItem'


export class Menu extends Component {
    render() {
        return (
            <div className={`menu screen-${this.props.currentScreen}`} style={{transform: `translateX(${this.props.menuTransform}%)`}}>
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
        )
    }
}

const mapStateToProps = (state) => ({
    menuTransform: state.menuTransform,
    metrix: state.metrix,
    currentScreen: state.currentScreen,
    selectedIndex: state.selectedIndex,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
