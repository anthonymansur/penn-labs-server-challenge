import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import passwordHash from "password-hash";
import axios from "axios";

class AddUserPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      studentID: "",
      email: "",
      password: "",
      year: 2022
    };
  }
  onChange = (event) => {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "studentID") {
      this.setState({ studentID: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    } else if (event.target.name === "year") {
      this.setState({ year: event.target.value });
    }
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      name: this.state.name,
      email: this.state.email,
      id: this.state.studentID,
      password: passwordHash.generate(this.state.password),
      year: this.state.year
    };
    const res = await axios.post("/api/user", body);
    if (res.data.success === true) {
      alert("New user has been added!");
      window.location = "/";
    }
  };
  render() {
    return (
      <div>
        <br />
        <h1 class="text-center">Add a new User</h1>
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
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                placeholder="Enter email"
              />
            </FormGroup>
            <FormGroup>
              <label>Student ID</label>
              <Input
                type="text"
                name="studentID"
                placeholder="Enter student ID"
                value={this.state.studentID}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Class Year</Label>
              <Input
                type="select"
                name="year"
                value={this.state.year}
                onChange={this.onChange}
              >
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </Input>
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

export default AddUserPage;
