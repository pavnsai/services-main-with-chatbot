import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Services from './components/Services/Services';
import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import {Amplify} from 'aws-amplify';
import CheckOut from './components/Checkout/CheckOut';
import DummySignInPage from './components/DummySignInPage';
import Orders from './components/Orders/Orders';
import ChatbotButton from './components/ChatBot/ChatButton';
import FreelanceProMarket from "./components/About/FreelanceProMarket";

Amplify.configure(awsconfig);

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <div className="App">
                <Route path="/services" exact>
                    <Services/>
                </Route>
                <Route path="/" exact>
                    <FreelanceProMarket/>
                </Route>
                <Route path="/home" exact>
                    <Home/>
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
                <Route path="/checkout">
                    <CheckOut/>
                </Route>
                <Route path="/orders">
                    <Orders/>
                </Route>
                <Route path="/login">
                    <DummySignInPage/>
                </Route>
                <ChatbotButton/>
            </div>
        </BrowserRouter>
    );
}

export default App;
