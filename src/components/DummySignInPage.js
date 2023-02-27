import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";
import { Auth } from "aws-amplify";
import { Spinner } from "react-bootstrap";

const DummySignInPage = () => {
  const {
    state: { cart, isLogin },
    dispatch,
    productDispatch,
  } = CartState();
  const history = useHistory();
  useEffect(() => {
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
        history.push({
          pathname: "/",
        });
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

export default withAuthenticator(DummySignInPage);
