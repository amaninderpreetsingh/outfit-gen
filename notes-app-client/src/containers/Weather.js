import React, {Component} from 'react';
import DarkSkyApi from 'dark-sky-api';
import Cookies from 'universal-cookie';
import "./Weather.css"
import Loading from '../components/Loading';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.cookies = cookies;

        const lat = cookies.get('lat')
        const lng = cookies.get('lng')

        DarkSkyApi.initialize('0f6cef4801f2f16d4dd1ce9ab391c196');
        this.state = {
            dailyWeather: null,
            lat: lat,
            lng: lng
        }
    }

    componentDidMount() {
        const position = (this.state.lat === undefined) ?
        {
            latitude: 39.250099, 
            longitude: -119.952003
        } :
        {
            latitude: this.state.lat, 
            longitude: this.state.lng
        }

        DarkSkyApi.loadCurrent(position)
        .then(res => {
            const dailyWeather = res;
            this.setState({dailyWeather});
            this.props.gotWeather(dailyWeather)
        });
    }

    render() {
        if (this.state.dailyWeather == null) {
            return <Loading />
        } else {
            const stats = ["summary", "temperature", "apparentTemperature", "windSpeed", "humidity"];
            const icon = <img src={"https://notes-app-client-at.s3.amazonaws.com/" +this.state.dailyWeather["icon"] + ".png"} />;
            const statsToVals = {}
            stats.forEach((stat) => {
                statsToVals[stat] = this.state.dailyWeather[stat];
            });
            return (
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>                
                    <span>
                    <h1 style={{paddingBottom: "20px", textAlign: "center"}}>{statsToVals["summary"]}</h1>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: "10px"}}>{icon}</div>
                    <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{statsToVals["temperature"]}&#176;</h2>
                    </span>
                </div>
            )
        }
    }
}

