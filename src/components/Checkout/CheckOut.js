import React, {useEffect, useState} from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../../context/Context";
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
const [loading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);
  useEffect(() => {
    async function fetchData(user) {
      await axios
        .post(
          "https://dl7cp34t47khween7itdmwukjm0makzp.lambda-url.us-east-1.on.aws/",
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
              setLoading(false);
              setSuccess(true);

              // Delay redirection
              setTimeout(() => {
                  history.push("/orders");
              }, 3000);
          },
          (error) => {
            console.error(error);
              setLoading(false);

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
        console.error(err);
          setLoading(false);

      });
  }, []);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
            </div>
        );
    }

    if (success) {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Heading level={3}>Order Successful!</Heading>
                <p>You will be redirected to the orders page in a few seconds...</p>
            </div>
        );
    }

    return null;
};

export default withAuthenticator(CheckOut);
