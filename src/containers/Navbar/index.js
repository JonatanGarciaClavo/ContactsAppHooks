import React, { useState, useCallback, useContext } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconElementList from '../../components/IconElementList';
import {
  HOME_PATHNAME,
  LIST_PATHNAME,
  ADD_PATHNAME,
  ADD_GROUP_PATHNAME,
} from '../../globals/pathNames';
import { Context as ListSettingsContext } from '../../state/listSettings/context';

const textToRouter = {
  List: LIST_PATHNAME,
  About: HOME_PATHNAME,
  'Add Contact': ADD_PATHNAME,
  'Add Group': ADD_GROUP_PATHNAME,
};

function renderIconElementRight(pathname, changeListMode) {
  if (pathname === LIST_PATHNAME) {
    return <IconElementList changeListMode={changeListMode} />;
  }
  return null;
}

function Navbar({ location, history }) {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const { setMode: changeListMode } = useContext(ListSettingsContext);
  const handleToggle = useCallback(() => {
    setIsLeftNavOpen(prevIsLeftNavOpen => !prevIsLeftNavOpen);
  });
  const handleClose = useCallback(e => {
    setIsLeftNavOpen(false);
    history.push(textToRouter[e.target.textContent]);
  });
  return (
    <React.Fragment>
      <AppBar
        title="Contacts app"
        onLeftIconButtonClick={handleToggle}
        iconElementRight={renderIconElementRight(location.pathname, changeListMode)}
      />
      <Drawer open={isLeftNavOpen} docked={false} onRequestChange={setIsLeftNavOpen}>
        <MenuItem onClick={handleClose} value={HOME_PATHNAME}>
          About
        </MenuItem>
        <MenuItem onClick={handleClose} value={LIST_PATHNAME}>
          List
        </MenuItem>
        <MenuItem onClick={handleClose} value={ADD_PATHNAME}>
          Add Contact
        </MenuItem>
        <MenuItem onClick={handleClose} value={ADD_GROUP_PATHNAME}>
          Add Group
        </MenuItem>
      </Drawer>
    </React.Fragment>
  );
}

export default Navbar;
