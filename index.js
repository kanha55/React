import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './index.css';
import App from './App';
import store from "./redux/store";
// import * as serviceWorker from './serviceWorker';
import RCFconfig from "./config";

// axios.defaults.baseURL = "https://127.0.0.1:8443"
axios.defaults.baseURL = RCFconfig.baseURL;

axios.interceptors.request.use(request => {
    request.headers = {
        "X-Auth-Key": "jason@runmybusiness.com",
        "X-Auth-Secret": "10",
    };
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
