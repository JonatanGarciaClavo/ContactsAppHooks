import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { LIST_MODE, CARD_MODE } from '../state/listSettings/state';

const MORE_MENU = 'more-menu';

const IconElementList = ({ changeListMode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleMenuItemListClick() {
    handleClose();
    changeListMode(LIST_MODE);
  }
  function handleMenuItemCardClick() {
    handleClose();
    changeListMode(CARD_MODE);
  }
  return (
    <React.Fragment>
      <IconButton
        aria-label="More"
        aria-owns={open ? MORE_MENU : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <Menu id={MORE_MENU} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleMenuItemListClick}>List</MenuItem>
        <MenuItem onClick={handleMenuItemCardClick}>Card</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

IconElementList.propTypes = {
  changeListMode: PropTypes.func.isRequired,
};

export default IconElementList;
