import styles from "../../assets/css/AddDriver.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Select } from "@material-ui/core";

// reactstrap components
import { Button, Label, Input } from "reactstrap";

// core components

export default function AddPassenger() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [cardType, setCardType] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newPassenger = {
      name,
      email,
      phone,
      type,
      cardType,
    };

    axios
      .post("http://localhost:8070/passengers/add", newPassenger)
      .then(() => {
        alert("Passenger Added");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <div style={{ paddingTop: "50px" }} className={styles.body}>
        <br />
        <br />
        <h3 className={styles.header} style={{ textAlign: "center" }}>
          Insert Passenger Details
        </h3>
        <br />
        <br />
        <div className={styles.FormContainer}>
          <form onSubmit={sendData}>
            <label for="name">
              <h5>Full Name</h5>
            </label>

            <Input
              placeholder="Enter Full Name"
              type="text"
              pattern="[A-Za-z]+"
              title="Please Enter Only Capital or Simple Letters, EX : Lukshithan Krishen"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label for="email">
              <h5>Email</h5>
            </label>

            <Input
              placeholder="Enter Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Enter a valid email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label for="type">
              <h5>Phone Number</h5>
            </label>

            <Input
              placeholder="Enter Mobile Number"
              type="text"
              pattern="[0-9]{10}"
              title="Enter a 10 digit phone number starting with 0"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <label for="type">
              <h5>Type</h5>
            </label>

            <Select
              required
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="Local">Local</option>
              <option value="Foreign">Foreign</option>
            </Select>

            <label for="cardType">
              <h5>Card Type</h5>
            </label>

            <Select
              required
              onChange={(e) => {
                setCardType(e.target.value);
              }}
            >
              <option value="Standard">Standard</option>
              <option value="Student">Student</option>
              <option value="Family">Family</option>
            </Select>

            <br />

            <center>
              <button type="submit" className="btn btn-primary">
                Add Passenger
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}
