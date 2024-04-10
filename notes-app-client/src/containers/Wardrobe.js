import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { API } from "aws-amplify";

export default class Wordrobe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            clothinigItems: {
                "Short_Sleeve_Shirts": [],
                "Long_Sleeve_Shirts": [],
                "Tank_Top": [],
                "Shorts": [],
                "Pants": [],
                "Shoes": [],
                "Boots": [],
                "Sandals": []
            }
        }
    }

    // TODO: make async calls to set the list of clothing items and call setState inside .then()
    async componentDidMount() {
        try {
            const wardrobe = await this.wardrobe();
            const shortShirts = wardrobe.filter((w) => w.type === "ShortSleeve").map((i) => {return {img: i.url, title: "title"}})
            const longShirts = wardrobe.filter((w) => w.type === "LongSleeve").map((i) => {return {img: i.url, title: "title"}})
            const tanks = wardrobe.filter((w) => w.type === "TankTop" || w.type === "TankTop").map((i) => {return {img: i.url, title: "title"}})
            const jackets = wardrobe.filter((w) => w.type === "Jacket").map((i) => {return {img: i.url, title: "title"}})
            const shorts = wardrobe.filter((w) => w.type === "Shorts").map((i) => {return {img: i.url, title: "title"}})
            const pants = wardrobe.filter((w) => w.type === "Pants").map((i) => {return {img: i.url, title: "title"}})
            const shoes = wardrobe.filter((w) => w.type === "Shoes").map((i) => {return {img: i.url, title: "title"}})
            const sandals = wardrobe.filter((w) => w.type === "Sandals").map((i) => {return {img: i.url, title: "title"}})
            const boots = wardrobe.filter((w) => w.type === "Boots").map((i) => {return {img: i.url, title: "title"}})
            this.setState(prevState => {
                let newClothingItems = { ...prevState.clothingItems}
                newClothingItems.Short_Sleeve_Shirts = shortShirts;
                newClothingItems.Long_Sleeve_Shirts = longShirts;
                newClothingItems.Tank_Top = tanks;
                newClothingItems.Jackets = jackets
                newClothingItems.Shorts = shorts;
                newClothingItems.Pants = pants;
                newClothingItems.Shoes = shoes;
                newClothingItems.Sandals = sandals;
                newClothingItems.Boots = boots;
                return {hasLoaded: true, clothinigItems: newClothingItems}
            });
        } catch (e) {
            console.log(e);
        }
    }

    wardrobe() {
        return API.get("notes", "/Wardrobe");
    }

    getClothingScrollView(item) {
        return (
            <>
              <h1 style={{paddingTop: 50}}> {item.replace(/_/g, " ")} </h1>
              <SingleLineGridList items={this.state.clothinigItems[item]}/> 
            </>
        );
    }

    render() {
        if (!this.state.hasLoaded) {
            return <></>
        }
        return (
            <>
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Add to my wardrobe
              </button>
            <div class="dropdown-menu">
              <Link to  = "/wardrobe/ShortSleeve"> <a class="dropdown-item" href = " " id = "sss" key="blah">Short sleeve Shirt</a> </Link>
              <Link to  = "/wardrobe/TankTop"> <a class="dropdown-item" href = " " id = "tt" key="blah">TankTop</a> </Link>
              <Link to  = "/wardrobe/LongSleeve"><a class="dropdown-item" href = " " id = "lss" key="blah">Long sleeve Shirt</a></Link>
              <Link to  = "/wardrobe/Jacket"><a class="dropdown-item" href = " " id = "j" key="blah">Jacket</a></Link>
              <Link to  = "/wardrobe/Shorts"><a class="dropdown-item" href = " " id = "s" key="blah">Shorts</a></Link>
              <Link to  = "/wardrobe/Pants"><a class="dropdown-item" href = " " id = "j" key="blah">Pants</a></Link>
              <Link to  = "/wardrobe/Boots"><a class="dropdown-item" href = " " id = "shoe" key="blah">Boots</a></Link>
              <Link to  = "/wardrobe/Shoes"><a class="dropdown-item" href = " " id = "shoe" key="blah">Shoes</a></Link>
              <Link to  = "/wardrobe/Sandals"><a class="dropdown-item" href = " " id = "shoe" key="blah">Sandals</a></Link>
            </div>
            </div>
            {Object.keys(this.state.clothinigItems).map((clothingItemName) => {
                return this.getClothingScrollView(clothingItemName)
            })}
            </>
        );
    }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // width: 900,
    // height: 700
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function SingleLineGridList(props) {
  const classes = useStyles();


  const setRedirect = async event => {
    
    console.log(event.target.id);
    console.log(props);
    props.history.push("/wardrobe/"+ event.target.id);
  }
  
  // const setRedirect = (event) => this.props.history.push("/test/"+ event.target.id);

  
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {props.items.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title}/>
            {/* <GridListTileBar
              title="hello"
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
