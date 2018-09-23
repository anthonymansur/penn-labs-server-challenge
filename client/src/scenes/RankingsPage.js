import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import passwordHash from "password-hash";

class RankingsPage extends Component {
  constructor() {
    super();
    this.state = {
      rankings: [],
      clubs: [],
      id: ""
    };
  }

  async componentWillMount() {
    const resUsers = await axios.get("/api/users");
    const users = resUsers.data.item;
    const userIDs = users.map(user => {
      return user.id;
    });
    let userExist = false;
    let id = prompt("Please enter the student id");
    while (!userIDs.includes(id)) {
      if (id === null) {
        window.location = "/";
        break;
      } else {
        id = prompt("ID does not exist. Please try again.");
      }
    }

    this.setState({ id });

    const resUser = await axios.get(`/api/user/${id}`);
    const user = resUser.data.item;
    let password = prompt("Please enter your password");
    let verified = passwordHash.verify(password, user.password);
    while (!verified) {
      if (password === null) {
        window.location = "/";
        break;
      } else {
        password = prompt("Password incorrect. Please try again.");
        verified = passwordHash.verify(password, user.password);
      }
    }
    const rankingsRes = await axios.get(`api/rankings/${id}`);
    const rankings = rankingsRes.data.success ? rankingsRes.data.item : [];
    const clubsRes = await axios.get("api/clubs");
    const clubs = clubsRes.data.item;
    this.setState({ rankings, clubs });
  }

  onChange = event => {
    const name = event.target.name.split("-");
    if (name[0] === "rank") {
      const rankings = this.state.rankings;
      rankings[parseInt(name[1]) - 1] = event.target.value;
      this.setState({ rankings });
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    console.log("submitted");
    const body = {
      clubs: this.state.rankings
    };
    const res = await axios.post(`/api/rankings/${this.state.id}`, body);
    if (res.data.success) {
      alert("Rankings have been updated!");
      window.location="/";
    } else {
      alert(res.data.message);
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1 className="text-center">View and Edit User's Rankings</h1>
        <div className="container">
          <div style={{ marginTop: "50px" }} />
          <Card>
            <CardBody>
              <strong>Current ranking order:</strong>{" "}
              {this.state.rankings &&
                this.state.rankings.map(club => {
                  return club + ", ";
                })}
            </CardBody>
          </Card>
          <br />
          <Form>
            <h2>Edit Rankings</h2>
            {this.state.clubs.map(club => {
              return (
                <FormGroup>
                  <Label>Rank #{this.state.clubs.indexOf(club) + 1}</Label>
                  <Input
                    type="select"
                    name={`rank-${this.state.clubs.indexOf(club) + 1}`}
                    onChange={this.onChange}
                    value={this.state.rankings[this.state.clubs.indexOf(club)]}
                  >
                    <option value=" "/>
                    {this.state.clubs.map(c => {
                      return (
                        <option id={c.name} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              );
            })}
            <FormGroup />
            <Button
              type="submit"
              class="btn btn-primary"
              onClick={(event) => this.onSubmit(event)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default RankingsPage;
