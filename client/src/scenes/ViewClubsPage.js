import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewClubsPage extends Component {
  constructor() {
    super();
    this.state = {
      clubs: []
    };
  }

  async componentWillMount() {
    const res = await axios.get("/api/clubs/sorted");
    if (res.data.success) {
      this.setState({ clubs: res.data.item });
    } else {
      console.log(res.data.message);
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1 className="text-center">View Clubs</h1>
        <div className="container">
          <ListGroup>
            <div style={{ marginTop: "50px" }} />
            {this.state.clubs &&
              this.state.clubs.map(club => {
                return (
                  <div id={club.name}>
                    <ListGroupItem>
                      <h2>{club.name}</h2>
                      <p>Size: {club.size}</p>
                    </ListGroupItem>
                    <br />
                  </div>
                );
              })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default ViewClubsPage;
