import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom"
import LoaderButton from "../components/LoaderButton";
import Cookies from 'universal-cookie';
import axios from 'axios';

async function signout(props) {
    await Auth.signOut();
    props.history.push("/login")
    window.location.reload();
  }  

export default class Settings extends Component {
    constructor(props) {
        super(props)
        const cookies = new Cookies();
        this.cookies = cookies;

        const name = cookies.get('nickname')
        const address = cookies.get('address')
        const latitude = cookies.get('lat')
        const longitude = cookies.get('lng')

        this.state = {
            nickname: name,
            address: address,
            lat: latitude,
            lng: longitude
        }

        this.setAddress = this.setAddress.bind(this);
    }

    componentDidMount() {
        console.log(this.state.address);
        if (this.state.lat === undefined || this.state.lng === undefined) {
            this.setAddress()
        } else {
            console.log('NOT UNDEFINED')
        }
    }

    handleNameChange = event => {
        this.setState({nickname: event.target.value})
    }

    handleAddyChange = event => {
        this.setState({address: event.target.value})
        this.setAddress()
    }

    setAddress() {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD3Sz1s1Tz7Bt5drNs8HfZjL-1ot8lzTVA&&address=" + this.state.address)
        .then(res => {
            const loc = res.data["results"][0]["geometry"]["location"]
            this.cookies.set('lat', loc["lat"], { path: '/' })
            this.cookies.set('lng', loc["lng"], { path: '/' })
            this.setState({
                lat: loc["lat"],
                lng: loc["lng"]
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    // handleLatChange = event => {
    //     this.setState({lat: event.target.value})
    // }

    // handleLongChange = event => {
    //     this.setState({long: event.target.value})
    // }

    validateForm = () => {
        // return this.state.nickname !== "" && this.state.address !== ""
        return true
    }

    handleSubmit = event => {
        event.preventDefault();
        this.cookies.set('nickname', this.state.nickname, { path: '/' })
        this.cookies.set('address', this.state.address, { path: '/' })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup style={{marginTop: 10}} controlId="content">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            onChange={this.handleNameChange}
                            value={this.state.nickname}
                            componentClass="textarea"
                            style={{width: 400, height: 40}}
                            placeholder="Please Provide a Nickname"
                        />
                        <ControlLabel style={{marginTop: 20}}>Address</ControlLabel>
                        <FormControl
                            onChange={this.handleAddyChange}
                            value={this.state.address}
                            componentClass="textarea"
                            style={{width: 400, height: 40}}
                            placeholder="Address"
                        />
                        {/* <FormControl
                            onChange={this.handleLatChange}
                            value={this.state.lat}
                            componentClass="textarea"
                            style={{width: 400, height: 40}}
                            placeholder="Latitude"
                        /> */}
                        {/* <FormControl
                            onChange={this.handleLongChange}
                            value={this.state.long}
                            componentClass="textarea"
                            style={{width: 400, height: 40, marginTop: 5}}
                            placeholder="Longitude"
                        /> */}
                        <LoaderButton
                            block
                            bsStyle="primary"
                            bsSize="small"
                            disabled={!this.validateForm()}
                            type="submit"
                            isLoading={false}
                            text="Save"
                            loadingText=""
                            style={{width: 400, height: 35, marginTop: 30}}
                        />
                    </FormGroup>
                </form>
                <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="small"
                    type="submit"
                    isLoading={false}
                    text="Logout"
                    loadingText=""
                    style={{width: 400, height: 35, marginTop: 20}}
                    onClick={() => signout(this.props)}
                />
                </div>
            </div>
        )
    }
}

