import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CleanupProvider} from "./components/Utils/CleanupContext";

ReactDOM.render(
    <Context>
        <CleanupProvider>
        <App />
    </CleanupProvider>
    </Context>,
    document.getElementById('root')
);
