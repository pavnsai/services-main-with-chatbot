import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // Import default styles
import { CartState } from "../../context/Context";
import { Auth } from "aws-amplify";
import { Spinner } from "react-bootstrap";
import "./AmplifySignInPage.css";

const AmplifySignInPage = () => {
    const { dispatch } = CartState();
    const history = useHistory();

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        })
            .then((user) => {
                dispatch({
                    type: "CHANGE_LOGIN",
                    payload: { state: true },
                });
                dispatch({
                    type: "CHANGE_USERNAME",
                    payload: { userName: user.username },
                });
                history.push({ pathname: "/" });
            })
            .catch((err) => {
                dispatch({
                    type: "CHANGE_LOGIN",
                    payload: { state: false },
                });
                dispatch({
                    type: "CHANGE_USERNAME",
                    payload: { userName: "" },
                });
                console.error(err);
            });
    }, []);

    return (
        <div className="sign-in-container">
            <div className="spinner-container">
                <Spinner animation="grow" style={{ color: "#007bff" }} />
                <Spinner animation="grow" style={{ color: "#007bff" }} />
                <Spinner animation="grow" style={{ color: "#007bff" }} />
            </div>
            <p className="loading-text">Signing in...</p>
        </div>
    );
};

export default withAuthenticator(AmplifySignInPage);