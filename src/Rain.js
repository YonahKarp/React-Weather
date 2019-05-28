import React, { Component } from 'react'

export class Rain extends Component {

    render() {
        var rainDrops = [];

        for (let i = 0; i < 50; i++) 
            rainDrops.push(<i key={"rain" + i} className="rainDrop"></i>)

        return (
            <div className="raintainer">
                {rainDrops}
            </div>
        )
    }
}

export default Rain
