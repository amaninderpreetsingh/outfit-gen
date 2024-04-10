import React, { Component } from "react";
import ColorGenerator from "../ColorGenerator";
import { API } from "aws-amplify";
import Article from "../components/Article";
import { CirclePicker } from 'react-color';
import { Popconfirm } from 'antd';
import WeatherGenerator from "../WeatherGenerator"
import Loading from "../components/Loading";

export default class Generators extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputColor: "#" + this.props.color,
            compColor: "",
            wardrobe: [],
            shirts: [],
            pants: [],
            shoes: [],
            jackets: [],
            doneLoading: false,
            gotWeather: false,
            displayPicker: false,
            tempColor: null,
            weather: null
        }
    }

    async componentDidMount() {
        try {
            const wardrobe = await this.wardrobe();
            this.setState({wardrobe})
            this.calculateColors(wardrobe)
        } catch (e) {
            alert(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.gotWeather == false && nextProps.weather) {
            this.setState({weather: nextProps.weather, gotWeather: true}, () => {
                this.calculateClothes()
            })
        }
    }

    wardrobe() {
        return API.get("notes", "/Wardrobe");
    }

    colorChanged = (color, event) => {
        this.setState({inputColor: color.hex}, () => {
            this.calculateColors(this.state.wardrobe)
        })
    }

    // runs second
    calculateClothes = () => {
        if (this.state.doneLoading && this.state.gotWeather && this.state.weather) {
            const wg = new WeatherGenerator()
            const clothingTypes = wg.getClothingTypes(this.state.weather)
            const newPants = this.state.pants.filter(w => w.type === clothingTypes.pantTypes[0])
            const newShoes = this.state.shoes.filter(w => w.type === clothingTypes.shoeTypes[0])
            const newShirts = this.state.shirts.filter(w => w.type === clothingTypes.shirtTypes[0])
            const newJackets = (clothingTypes.jacketTypes[0] === null) ? [] : this.state.jackets
            this.setState({shoes: newShoes, pants: newPants, shirts: newShirts, jackets: newJackets})
        }
    }

    // runs first
    calculateColors = (wardrobe) => {
        var pants = wardrobe.filter(w => w.type === "Pants" || w.type === "Shorts")
        var shirts = wardrobe.filter(w => w.type === "ShortSleeve" || w.type === "LongSleeve" || w.type === "TankTop")
        var jackets = wardrobe.filter(w => w.type === "Jacket")
        var shoes = wardrobe.filter(w => w.type === "Shoes" || w.type === "Boots" || w.type === "Sandals")

        const cg = new ColorGenerator()
        shirts = cg.sortClothing(this.state.inputColor, shirts)

        const compColor = cg.getComplement(this.state.inputColor)

        pants = cg.sortClothing(compColor, pants)
        jackets = cg.sortClothing(compColor, jackets)
        shoes = cg.sortClothing(compColor, shoes)

        this.setState({shoes, pants, jackets, shirts, compColor, doneLoading: true}, () => {
            this.calculateClothes()
        })
    }

    closePicker = () => {
        this.setState({displayPicker: false})
    };

    openPicker = () => {
        this.setState({displayPicker: true})
    }

    confirm = () => {
        this.setState({inputColor: this.state.tempColor}, () => {
            this.calculateColors(this.state.wardrobe)
        })
    }

    cancel = () => {
        this.setState({tempColor: null})
    }

    tempColorChange = (color) => {
        this.setState({tempColor: color.hex})
    }

    render() {
        if (this.state.doneLoading && this.state.gotWeather) {
            return (
                <div style={{paddingLeft: 20}}>
                    <h2 style={{color: "gray", display: "flex", position: 'absolute'}}>
                        Your Outfit Based on &nbsp;
                        <Popconfirm
                            title={<CirclePicker onChange={this.tempColorChange} />}
                            onConfirm={this.confirm}
                            onCancel={this.cancel}
                            okText={null}
                            cancelText="Cancel"
                            icon={null}
                        >
                            <div onClick={this.openPicker} style={{cursor: "pointer", borderRadius: 12.5, backgroundColor: this.state.inputColor, width: 50, height: 50}} />
                        </Popconfirm>
                        &nbsp;Shirt
                    </h2>
                    <div style={{display: "flex", flexWrap: "wrap", paddingTop: 50}}>
                        <Article desiredColor={this.state.inputColor} title="Shirt" articles={this.state.shirts} />
                        <Article desiredColor={this.state.compColor} title="Pants" articles={this.state.pants} />
                        {this.state.jackets.length > 0 && <Article desiredColor={this.state.compColor} title="Jacket" articles={this.state.jackets} />}
                        <Article desiredColor={this.state.compColor} title="Shoes" articles={this.state.shoes} />
                    </div>
                </div>
            )
        }
        return <Loading />
    }
}