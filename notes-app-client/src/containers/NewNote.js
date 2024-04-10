import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import { ColorExtractor } from "react-color-extractor";
import "./NewNote.css";
import AspectRatio from 'react-aspect-ratio';
import { Icon } from 'antd';

// const IMAGE_STYLES = { width: 700, height: 500};
var attachment = " ";
const SWATCHES_STYLES = {
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
  selectedColor: ""
};
export default class  extends Component {
  // state = { colors: [] };
  constructor(props) {
    //var imgSrc = ' ';
    super(props);

    this.file = null;

    this.state = {
      colors: [],
      isLoading: null,
      content: "",
      imgSrc: ' ',
      loadingImage: false
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  // handleChange = event => {
  //   console.log("loadingImage: " + this.state.loadingImage)
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  handleFileChange = event => {
    this.setState({loadingImage: true})
    this.file = event.target.files[0];
    this.submitFile();
    //this.setState({imgSrc: "https://notes-app-client-at.s3.amazonaws.com/private/us-east-2%3Aec47da84-13d2-4c7e-9bf4-663339da6fe5/1561407263488-download.jpeg"
    //})
  }

  submitFile = async () => {
    console.log(this.file.name);
    try {
        this.attachment = this.file
        ? await s3Upload(this.file)
        : null;
      console.log(attachment);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    
    await this.setState({imgSrc: "https://notes-app-client-at.s3.amazonaws.com/public/" + this.attachment})
    this.setState({loadingImage: false})
  }


  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      await this.createNote({
        //attachment: this.attachment,
        color: this.state.selectedColor,
        type: this.props.match.params.id,
        url: this.state.imgSrc
      });
      this.props.history.push("/wardrobe");
    } catch (e) {
      console.log("Hello123");
      alert(e);
      console.log(e);
      this.setState({ isLoading: false });
    }
  }

  clickedColor = (event) => {
    this.setState({selectedColor: event.target.id})
  }

  renderSwatches = () => {
    const { colors } = this.state;
    return colors.map((color, id) => {
      return (
        <div
          onClick={this.clickedColor}
          key={id}
          id={color}
          style={{
            backgroundColor: color,
            width: 100,
            height: 100,
            margin: 10,
            cursor: "pointer",
            border: this.state.selectedColor === color ? "5px solid black" : null,
            borderRadius: 50
          }}
        />
      );
    });
  };
    
  createNote(note) {
    console.log(note)
    var check = API.post("notes", "/Wardrobe", {
      body: note
    });
    return check;
  }
  

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors], selectedColor: colors[0] }));

  render() {
    return (
      <div className="">
        {this.state.loadingImage && 
          <div style={{display: "flex", justifyContent: "center"}}>
            <Icon style={{fontSize: 40, color: "#00bcd4"}} type="loading" />
          </div>
        }
        <div style={{display: "flex", justifyContent: "center"}}>
          <AspectRatio ratio="1" style={{ maxHeight: '400px' }}>
            <ColorExtractor getColors={this.getColors}>
              <img className="theImage" src= {this.state.imgSrc} style={{maxHeight: 400}} alt = " "/>
            </ColorExtractor>
          </AspectRatio>
        </div>
        {this.state.imgSrc !== ' ' && <div style={SWATCHES_STYLES}>{this.renderSwatches()}</div>}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
