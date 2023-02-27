import React, { useEffect } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Auth } from "aws-amplify";

const CheckOut = () => {
  const {
    state: { cart, isLogin, userName },
    dispatch,
    productDispatch,
  } = CartState();
  const history = useHistory();

  useEffect(() => {
    async function fetchData(user) {
      await axios
        .post(
          "https://thucsi4ibdq7iqsbulp7fhbexu0dmaah.lambda-url.us-east-1.on.aws/",
          { request: "uploaddata", data: cart, userName: user }
        )
        .then(
          (res) => {
            dispatch({
              type: "CLEAR_CART",
              payload: {
                state: true,
              },
            });
            dispatch({
              type: "CHANGE_MODAL",
              payload: {
                modal: true,
              },
            });
            history.push({
              pathname: "/",
            });
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
          type: "CHANGE_USERNAME",
          payload: {
            userName: user.username,
          },
        });
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: true,
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

  return (
    <div>
      <Spinner
        animation="grow"
        style={{ marginLeft: "40%", marginTop: "10%" }}
      />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
};

export default withAuthenticator(CheckOut);
