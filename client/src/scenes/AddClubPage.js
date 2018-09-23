import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

class AddClubPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      size: ""
    };
  }
  onChange = (event) => {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "size") {
      this.setState({ size: event.target.value });
    }
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      name: this.state.name,
      size: parseInt(this.state.size)
    };
    const res = await axios.post("/api/clubs", body);
    if (res.data.success === true) {
      alert("New club has been added!");
      window.location = "/";
    } else {
      console.log(res.data);
      alert(res.data.message);
    }
  };
  render() {
    return (
      <div>
        <br />
        <h1 class="text-center">Add a new club</h1>
        <Container>
          <div style={{ marginTop: "50px" }} />
          <Form >
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                placeholder="Enter name"
              />
            </FormGroup>
            <FormGroup>
              <label>Size</label>
              <Input
                type="text"
                name="size"
                placeholder="Enter size of club"
                value={this.state.size}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button
              type="submit"
              class="btn btn-primary"
              onClick={(event) => this.onSubmit(event)}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddClubPage;
