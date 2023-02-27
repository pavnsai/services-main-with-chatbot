import React, { useEffect, useState } from "react";
import { withAuthenticator, Heading } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { CartState } from "../context/Context";
import axios from "axios";
import { Paginated } from "./Paginated";
import datajson from "./data.json";
import datajson2 from "./data2.json";
import { COLUMNS, ORDER_COLUMNS, COLUMNS2 } from "./column";
import Card from "react-bootstrap/Card";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Orders = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    async function fetchData(user) {
      await axios
        .post(
          "https://thucsi4ibdq7iqsbulp7fhbexu0dmaah.lambda-url.us-east-1.on.aws/",
          { request: "pastdata", userName: user }
        )
        .then(
          (res) => {
            setData(res.data.pastData);
            setSpinner(false);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: true,
          },
        });
        dispatch({
          type: "CHANGE_USERNAME",
          payload: {
            userName: user.username,
          },
        });
        fetchData(user.username);
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: false,
          },
        });
        dispatch({
          type: "CHANGE_USERNAME",
          payload: {
            userName: "",
          },
        });
        console.log(err);
      });
  }, []);

  return spinner ? (
    <div>
      <Spinner
        animation="grow"
        style={{ marginLeft: "40%", marginTop: "10%" }}
      />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  ) : data && data.length !== 0 ? (
    <Container style={{ marginTop: "20px" }}>
      <Card style={{ width: "80%", marginLeft: "10%" }}>
        <Card.Header>
          <strong>Order Details</strong>
        </Card.Header>
        <Card.Body>
          <Paginated data={data} columns={ORDER_COLUMNS} />
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Container style={{ marginTop: "10%" }}>
      <Card style={{ width: "50%", marginLeft: "20%" }}>
        <Card.Header>
          <strong>Order Details</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text>You haven't Ordered anything yet!...</Card.Text>
          <Button
            variant="primary"
            style={{ marginTop: "10px" }}
            onClick={() => {
              history.push({
                pathname: "/",
              });
            }}
          >
            Order?
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default withAuthenticator(Orders);
