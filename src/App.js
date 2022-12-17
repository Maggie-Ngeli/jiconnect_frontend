import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Busdev from './components/Busdev';
import Profile from './components/Profile';
import Application from './components/Application';
import Notfound from './components/Notfound';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import Details from './components/Details';
import Documents from './components/Documents';
import Designer from './components/Designer';
import Engineer from './components/Engineer';
import Proposal from './components/Proposal';
import Note from './components/Note';
import Payments from './components/Payments';
import Qoutation from './components/Qoutation';
import Activate from './components/Activate';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import Analytics from './components/Analytics';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
        <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home"/>
              </Route>
              <Route exact path="/home" component={Home} />
              <Route path="/applications/all" component={Busdev} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/detailsform" component={Details} />
              <Route exact path="/analytics" component={Analytics} />
              <Route exact path="/application" component={Application} />
              <Route exact path="/payments" component={Payments} />
              <Route path="/applications/designer" component={Designer} />
              <Route path="/applications/proposal" component={Proposal} />
              <Route path="/applications/note" component={Note} />
              <Route path="/payments/qoute" component={Qoutation} />
              <Route path="/applications/engineer" component={Engineer} />
              <Route path="/documents" component={Documents} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path='/reset-password' component={ResetPassword} />
              <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
              <Route exact path='/activate/:uid/:token' component={Activate} />
              <Route component={Notfound} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
