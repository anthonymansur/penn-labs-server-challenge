import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./scenes/HomePage";
import AddUserPage from "./scenes/AddUserPage";
import ViewClubsPage from "./scenes/ViewClubsPage";
import AddClubPage from "./scenes/AddClubPage";
import ViewUserPage from "./scenes/ViewUserPage";
import RankingsPage from "./scenes/RankingsPage";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/"           component={HomePage} />
            <Route exact path="/add-user"   component={AddUserPage} />
            <Route exact path="/view-clubs" component={ViewClubsPage} />
            <Route exact path="/add-club"   component={AddClubPage} />
            <Route exact path="/view-user"  component={ViewUserPage} />
            <Route exact path="/rankings"   component={RankingsPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
