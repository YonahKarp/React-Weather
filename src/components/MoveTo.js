import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MoveTo extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            searchValue: "",
            
        }
    }

    render() {
        const searchValue = this.state.searchValue.toLowerCase();
        const lists = this.props.lists.filter(e => this.state.searchValue ? e.name.toLowerCase().includes(searchValue) : e);

        return (
            <div className="fullPanel moveTo">
                <div className="header addHeader">
                    <div onClick={this.props.closePanel}>Cancel</div>
                    <div className="headerTitle">Move to..</div>
                    <div></div>
                </div>
                <div className="searchbar">
                    <span className="icon icon-search"></span>
                    <input placeholder="Find..." value={this.state.searchValue} onChange={(e)=>this.setState({searchValue: e.target.value})}/>
                    <span className="icon iconX" hidden={!this.state.searchValue} onClick={()=> this.setState({searchValue: ''})}>X</span>
                </div>

                {!!lists.length && <div className="listsContainer">
                    <div className="smallTitle">LISTS</div>
                    <div className="listsList">
                        {lists.map((list, i) =>
                            <div key={`list-${list.name}`} className="list">
                                <div className="color" style={{backgroundColor: list.color}}></div>
                                <div className="name"> {list.name}</div>
                            </div>
                        )}
                    </div>
                </div>}
                <div className="btn-full">Create New List...</div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lists: state.lists
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveTo)
