import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import "./App.css";
import Navigation from "./Navigation"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }  
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }
    
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    const h4Settings = {lineHeight: "30px", padding: 10, verticalAlign: "middle"}

    return (
      <div>
        <Navigation key = "check" childProps={childProps}/>
      </div>
    )
  }
}

export default withRouter(App);
