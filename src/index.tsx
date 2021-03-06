import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CountryDetail from './pages/CountryDetail';
import './assets/styles/style.scss';
import './translation/i18n';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/country/:countryCode" exact component={CountryDetail} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
