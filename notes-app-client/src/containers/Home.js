import React, { Component } from "react";
import "./Home.css";
import MyButton from "./MyButton"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    this.setState({ isLoading: false });
  }
  renderLander() {
    return (
      <div className="lander">
        <h1>Outfitgen</h1>
        <p>The right outfit, less time.</p>
      </div>
    );
  }

  render() {
    console.log("rendering home")
    if (this.props.isAuthenticated) {
      this.props.history.push("/wardrobe")
      console.log("PUSHED")
      return <></>
    }
    return (
      <div className="Home" style={{display: "flex", justifyContent: "center"}}>
        <div>
        {this.renderLander()}
        <MyButton text="login" onClick={() => {this.props.history.push("/login")}}/>
        <MyButton text="signup" onClick={() => {this.props.history.push("/signup")}}/>
        </div>
      </div>
    );
  }
}

