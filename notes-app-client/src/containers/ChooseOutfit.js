import React, { Component } from "react";
import Generators from "./Generators";
import Weather from "./Weather"
const tinycolor = require("tinycolor2");

export default class  extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genColor: tinycolor.random().toHex(),
            // genColor: "849534",
            weather: null,
            doneLoading: false
        }
    }

    // componentDidMount() {
    //     this.gotWeather()
    // }

    gotWeather = (weather) => {
        this.setState({weather, doneLoading: true})
    }


    render() {
        return (
            <div style={{display: "flex", width: "100%", paddingTop: 10}}>
                <div style={{width: "50%"}}><Weather gotWeather={this.gotWeather} /> </div>
                <div style={{width: 1, backgroundColor: "gray"}} />
                <div style={{width: "50%"}}><Generators weather={this.state.weather} color={this.state.genColor}/></div>
                {/* <div style={{width: "50%"}}><Generators weather={this.state.weather} color={this.state.genColor}/></div> */}
            </div>
        )
    }
}