import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Generators from "./containers/Generators";
import ChooseOutfit from "./containers/ChooseOutfit";
import Settings from "./containers/Settings";
import Wardrobe from "./containers/Wardrobe"

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/wardrobe/:id" exact component={NewNote} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    {/* <AuthenticatedRoute path="/notes-at/new" exact component={NewNote} props={childProps} /> */}
    <AuthenticatedRoute path="/notes-at/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="//:color" exact component={Generators} props={childProps} />
    <AuthenticatedRoute path="/choose-outfits" exact component={ChooseOutfit} props={childProps} />
    <AuthenticatedRoute path="/wardrobe" exact component={Wardrobe} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
