import React, { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { CartState } from "../../context/Context";
import axios from "axios";
import { ORDER_COLUMNS } from "../column";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import './Orders.css'

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
            try {
                const res = await axios.post(
                    "https://dl7cp34t47khween7itdmwukjm0makzp.lambda-url.us-east-1.on.aws/",
                    { request: "pastdata", userName: user }
                );
                setData(res.data.pastData);
                setSpinner(false);
            } catch (error) {
                console.log(error);
                setSpinner(false);
            }
        }

        Auth.currentAuthenticatedUser({ bypassCache: false })
            .then((user) => {
                dispatch({ type: "CHANGE_LOGIN", payload: { state: true } });
                dispatch({ type: "CHANGE_USERNAME", payload: { userName: user.username } });
                fetchData(user.username);
            })
            .catch((err) => {
                dispatch({ type: "CHANGE_LOGIN", payload: { state: false } });
                dispatch({ type: "CHANGE_USERNAME", payload: { userName: "" } });
                console.log(err);
                setSpinner(false);
            });
    }, [dispatch]);

    if (spinner) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="order-container">
                <div className="order-card empty-card">
                    <h2>Order Details</h2>
                    <p>You haven't ordered anything yet!</p>
                    <button className="order-btn" onClick={() => history.push("/services")}>
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-container">
            <div className="order-card">
                <h2>Order Details</h2>
                <div className="order-card-body">
                    <Table data={data} columns={ORDER_COLUMNS} />
                </div>
            </div>
        </div>
    );
};

export default withAuthenticator(Orders);