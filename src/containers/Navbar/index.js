import React, { useState, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IconElementList from '../../components/IconElementList';
import {
  HOME_PATHNAME,
  LIST_PATHNAME,
  ADD_PATHNAME,
  ADD_GROUP_PATHNAME,
} from '../../globals/pathNames';
import { Context as ListSettingsContext } from '../../state/listSettings/context';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 200,
  },
}));

function Navbar({ location, history }) {
  const classes = useStyles();
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const { setMode: changeListMode } = useContext(ListSettingsContext);

  const handleToggle = useCallback(() => {
    setIsLeftNavOpen(prevIsLeftNavOpen => !prevIsLeftNavOpen);
  });
  const handleClose = useCallback(pathname => () => {
    setIsLeftNavOpen(false);
    history.push(pathname);
  });

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon onClick={handleToggle} />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Contacts app
          </Typography>
          {location.pathname === LIST_PATHNAME && (
            <IconElementList changeListMode={changeListMode} />
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={isLeftNavOpen} onClose={handleToggle}>
        <div className={classes.list}>
          <List>
            <ListItem button onClick={handleClose(HOME_PATHNAME)}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={handleClose(LIST_PATHNAME)}>
              <ListItemText primary="List" />
            </ListItem>
            <ListItem button onClick={handleClose(ADD_PATHNAME)}>
              <ListItemText primary="Add Contact" />
            </ListItem>
            <ListItem button onClick={handleClose(ADD_GROUP_PATHNAME)}>
              <ListItemText primary="Add Group" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Navbar;
