import React, { Component } from "react";
import ColorGenerator from "../ColorGenerator";
import "./Article.css";

export default class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentArticle: 0,
            difference: 0
        }
    }

    componentDidMount() {
        this.setDifference()
    }

    setDifference = () => {
        if (this.props.articles.length !== 0) {
            const cg = new ColorGenerator()
            const diff = cg.colorDifference(this.props.desiredColor, this.props.articles[this.state.currentArticle].color)
            const match = 100 * (1 - (diff / 3) / 255)
            this.setState({difference: Math.round(match)})
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currentArticle: 0}, () => {
            this.setDifference()
        })
    }

    nextArticle = () =>  {
        if (this.state.currentArticle === this.props.articles.length - 1) {
            this.setState({currentArticle: 0}, () => {
                this.setDifference()
            })
        } else {
            this.setState({currentArticle: this.state.currentArticle + 1}, () => {
                this.setDifference()
            })
        }
    }

    render() {
        if (this.props.articles.length === 0) {
            return (
                <div className="bgImage" style={{backgroundColor: "gray"}}>
                    <h5 className="articleTitle">
                        <div style={{width: 30, height: 30, borderRadius: 4}}/>
                        Add {this.props.title} to Wardrobe
                    </h5>
                </div>
            )
        }
        return (
            <div onClick={this.nextArticle} className="bgImage" style={{backgroundImage: `url(${this.props.articles[this.state.currentArticle].url})`}}>
                <h5 className="articleTitle" style={{color: this.props.articles[this.state.currentArticle].color}}>
                    <div style={{width: 30, height: 30, borderRadius: 4, backgroundColor: this.props.articles[this.state.currentArticle].color}}/>
                    &nbsp;{this.props.articles[this.state.currentArticle].type} {this.state.difference}%
                </h5>
            </div>
        )
    }
}