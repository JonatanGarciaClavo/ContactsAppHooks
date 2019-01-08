import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import { HOME_PATHNAME } from './globals/pathNames';
import * as GroupsContext from './state/groups/context';
import * as ContactsContext from './state/contacts/context';
import * as SnackbarContext from './state/snackbar/context';
import * as ListSettingsContext from './state/listSettings/context';
import * as UIContext from './state/ui/context';

const Root = () => (
  <UIContext.Provider>
    <SnackbarContext.Provider>
      <ListSettingsContext.Provider>
        <GroupsContext.Provider>
          <ContactsContext.Provider>
            <MuiThemeProvider>
              <Router>
                <Route path={HOME_PATHNAME} component={App} />
              </Router>
            </MuiThemeProvider>
          </ContactsContext.Provider>
        </GroupsContext.Provider>
      </ListSettingsContext.Provider>
    </SnackbarContext.Provider>
  </UIContext.Provider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
