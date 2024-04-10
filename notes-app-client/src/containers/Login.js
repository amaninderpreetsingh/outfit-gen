import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import "./Login.css";
import MyButton from "./MyButton"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }      
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="small"
                    type="submit"
                    isLoading={false}
                    text="Login"
                    loadingText=""
                    style={{width: 400, marginTop: 10}}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="small"
                    isLoading={false}
                    text="Signup"
                    loadingText=""
                    style={{width: 400, marginTop: 10, backgroundColor: "red", 'outline-color': "red"}}
                    onClick={() => this.props.history.push("/signup")}
            />
          </div>
        </form>
      </div>
    );
  }
}
