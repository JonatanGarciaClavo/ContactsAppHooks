import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ADD_PATHNAME,
  LIST_PATHNAME,
  EDIT_PATHNAME,
  DETAIL_PATHNAME,
  ADD_GROUP_PATHNAME,
} from './globals/pathNames';
import About from './containers/About';
import ContactForm from './containers/ContactForm';
import ContactList from './containers/ContactList';
import ContactDetail from './containers/ContactDetail';
import Navbar from './containers/Navbar';
// import Loader from "./containers/Loader";
import Snackbar from './containers/Snackbar';
import GroupForm from './containers/GroupForm';

class App extends Component {
  render() {
    const { location, history } = this.props;
    return (
      <div>
        <Navbar location={location} history={history} />
        {/* <Loader /> */}
        <Switch>
          <Route exact path={ADD_PATHNAME} component={ContactForm} />
          <Route exact path={LIST_PATHNAME} component={ContactList} />
          <Route exact path={`${EDIT_PATHNAME}/:id`} component={ContactForm} />
          <Route exact path={`${DETAIL_PATHNAME}/:id`} component={ContactDetail} />
          <Route exact path={ADD_GROUP_PATHNAME} component={GroupForm} />
          <Route component={About} />
        </Switch>
        <Snackbar />
      </div>
    );
  }
}

export default App;
