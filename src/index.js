import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './bootstrap';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import { HOME_PATHNAME } from './globals/pathNames';
import * as GroupsContext from './state/groups/context';
import * as ContactsContext from './state/contacts/context';
import * as SnackbarContext from './state/snackbar/context';
import * as ListSettingsContext from './state/listSettings/context';
import * as UIContext from './state/ui/context';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const Root = () => (
  <UIContext.Provider>
    <SnackbarContext.Provider>
      <ListSettingsContext.Provider>
        <GroupsContext.Provider>
          <ContactsContext.Provider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Router>
                <Route path={HOME_PATHNAME} component={App} />
              </Router>
            </ThemeProvider>
          </ContactsContext.Provider>
        </GroupsContext.Provider>
      </ListSettingsContext.Provider>
    </SnackbarContext.Provider>
  </UIContext.Provider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
