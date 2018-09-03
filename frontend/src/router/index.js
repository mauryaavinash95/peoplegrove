import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';

import Main from '../components/Main';
import Login from '../components/Login';
import Signup from '../components/Signup';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import SetAppointment from '../components/SetAppointment';

export const routes = (
    <Router history={history}>
        <Main>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={Home} />
                <Route path="/setappointment" component={SetAppointment} />
                {/* <Route path="/profile" component={Profile} /> */}
                <Route path="*" component={NotFound} />
            </Switch>
        </Main>
    </Router>
)