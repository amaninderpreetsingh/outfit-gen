import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  
    this.setState({ isLoading: false });
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    const { email, password, confirmationCode } = this.state;

    this.setState({ isLoading: true });

    try {
        console.log('confirmSignUp');
        await Auth.confirmSignUp(email, confirmationCode);
        await Auth.signIn(email, password);
        console.log('signIn');

        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
    } catch (e) {
        console.log({ e });
        alert(e.message);
    }

    this.setState({ isLoading: false });
}

  
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateConfirmationForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Verify"
            loadingText="Verifying…"
            style={{width: 400, marginTop: 10}}
            // onClick={() => this.props.history.push("/login")}
          />
        </div>
      </form>
    );
  }

  renderForm() {
    return (
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
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
                    text="Signup"
                    loadingText=""
                    style={{width: 400, marginTop: 10, backgroundColor: "red", 'outline-color': "red"}}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="small"
                    isLoading={false}
                    text="Login"
                    loadingText=""
                    style={{width: 400, marginTop: 10}}
                    onClick={() => this.props.history.push("/login")}
            />
          </div>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
