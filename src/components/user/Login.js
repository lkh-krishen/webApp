import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useLocation,Link } from "react-router-dom";



import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Card,
  Alert,
  Container,
  Button,
  Form,

  InputGroup,

  InputGroupText,
} from "reactstrap";


import styles from "../../assets/css/styles-login.module.css";

function Login({ user, setuser }) {
  const history = useHistory();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [alertDanger, setAlertDanger] = React.useState(false);
  const [message, setmessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8078/users/check/${username}`).then((res) => {
      if (res.data === true) {
        axios.get(`http://localhost:8078/users/get/${username}`).then((res) => {
          if (password != res.data.password) {
            setmessage("Incorrect password!");
            setAlertDanger(true);
          } else {

           

            history.push({
              pathname: "/adminPannel1",
            });
           
            setAlertDanger(false);
          }
        });
      } else {
        setmessage("Please check your username");
        setAlertDanger(true);
      }
    });
  };

 

  return (
    <div style={{ width: "100vw" }}>
      <Row>
        <Col xl="8">
          <div className={styles.loginImg}></div>
        </Col>
        <Col>
          <div className={styles.loginForm}>
          <h1 className={styles.textColor}>Travellee</h1>
            <br/>
            <h2>Login to your station</h2>
            <br />
            <br />

            <Form style={{ width: "80%" }} onSubmit={login}>
              <Alert
                className="alert-with-icon"
                color="danger"
                isOpen={alertDanger}
              >
                <Container>
                  <div className="alert-wrapper">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setAlertDanger(false)}
                    >
                      <i className="nc-icon nc-simple-remove" />
                    </button>
                    <div className="message">{message}</div>
                  </div>
                </Container>
              </Alert>
              <FormGroup>
                <Label for="username">Username</Label>
                <InputGroup>
                  
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                 
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup>
                  
                    <InputGroupText>
                      <i className="nc-icon nc-key-25" />
                    </InputGroupText>
                 
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    required
                  />
                </InputGroup>
              </FormGroup>
              {/*<a href="#" style={{ float: "right" }}>
                <strong>Forgot password?</strong>
  </a>*/}
              <br />
              <br />
               {/* <Link to ="/adminPannel1"> */}
              <Button type="submit" class="btn btn-info"  style={{ width: "100%" }}  >
                
                Log In
              </Button>
               {/* </Link>  */}
              <br />
              <br />
              <label>
                Don't have an account?{" "}
                <a href="/register">
                  <strong>Create an account</strong>
                </a>
              </label>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
