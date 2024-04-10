import React, {Component} from 'react';
import { Icon } from 'antd';

export default class extends Component {
    render() {
        return (
            <div style={{marginTop: 250, display: "flex", justifyContent: "center"}}>
                <Icon style={{fontSize: 40, color: "#00bcd4"}} type="loading" />
            </div>
        )
    }
}