import React from 'react';
import { Link } from "react-router-dom";
import Routes from "./Routes";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTshirt, faDoorOpen, faUserCog } from '@fortawesome/free-solid-svg-icons'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#00BCD4"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Navigation(props) {
  const classes = useStyles();
  const textToRoute = {
      "Wardrobe": {path: "/wardrobe", icon: <FontAwesomeIcon size="2x" icon={faDoorOpen} />},
      "Choose Outfits": {path: "/choose-outfits", icon: <FontAwesomeIcon size="2x" icon={faTshirt} />},
      "Settings": {path: "/settings", icon: <FontAwesomeIcon size="2x" icon={faUserCog} />}
  }

  var title
  if (window.location.href.search("redirect") == -1) {
    const urlVals = window.location.href.split("/")
    const titlelower = urlVals[urlVals.length - 1]
    try {
      title = titlelower.split("-").map((word) => {
          return word[0].toUpperCase() + word.substr(1);
      })
      title = title.join(" ");
    } catch (e) {
      //   console.log(e)
        title = "Home"
    }  
  } else {
    title = "Login"
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography style={{color: "white", fontFamily: "Gill Sans", fontWeight: "bold", fontSize: "2em"}} variant="h6" noWrap>
                {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <h3 style={{padding: 0, marginBottom: -60, padding: 13, fontFamily: "Gill Sans"}}>OutfitGen</h3>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Wardrobe', 'Choose Outfits', 'Settings'].map(text => (
            <Link to={textToRoute[text].path} style={{ color: 'black' }}>
                <ListItem button key={text}>
                    <ListItemIcon>{textToRoute[text].icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes childProps={props.childProps}/>
      </main>
    </div>
  );
}
