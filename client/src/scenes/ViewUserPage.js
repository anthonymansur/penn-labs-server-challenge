import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewUserPage extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  async componentWillMount() {
    const usersRes = await axios.get(`/api/users`);
    const users = usersRes.data.success ? usersRes.data.item : [];
    const userIDs = users.map(user => { return user.id });
    let ID = prompt("Please enter the id of the user you want to view");
    while (!userIDs.includes(ID)) {
      if (ID === null) {
        window.location = "/";
        break;
      } else {
        ID = prompt("ID does not exist. Please try again.")
      }
    }
    const userRes = await axios.get(`/api/user/${ID}`);
    if (userRes.data.success) {
      this.setState({ user: userRes.data.item });
    } else {
      console.log(userRes.data.message);
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1 className="text-center">View User</h1>
        <div className="container">
          <Card>
            <CardBody>
              <CardTitle><strong>{this.state.user.name}</strong></CardTitle>
              <p><strong>Email: </strong>{this.state.user.email}</p>
              <p><strong>Student ID: </strong>{this.state.user.id}</p>
              <p><strong>Year: </strong>{this.state.user.year}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default ViewUserPage;
