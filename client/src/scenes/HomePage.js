import React, { Component } from "react";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";


class HomePage extends Component {
  render() {
    return (
      <div>
        <br />
        <h1 className="text-center">Penn Labs Server API</h1>
        <div className="container">
          <div style={{marginTop: "50px"}} />
          <h1 className="display-3 text-center">What would you like to do?</h1>
          <div className="text-center">
            <Link to="add-user"><Button color="link">Add a new user</Button></Link><br/>
            <Link to="view-clubs"><Button color="link">View Clubs</Button></Link><br/>
            <Link to="add-club"><Button color="link">Add a new Club</Button></Link><br/>
            <Link to="rankings"><Button color="link">Edit/View a user's rankings</Button></Link><br/>
            <Link to="view-user"><Button color="link">Get a user by ID</Button></Link><br/>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
