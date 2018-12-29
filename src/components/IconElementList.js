import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { LIST_MODE, CARD_MODE } from '../state/listSettings/state';

const iCON_SETTINGS = { horizontal: 'right', vertical: 'top' };

const IconElementList = ({ changeListMode }) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    targetOrigin={iCON_SETTINGS}
    anchorOrigin={iCON_SETTINGS}
  >
    <MenuItem primaryText="List" onClick={() => changeListMode(LIST_MODE)} />
    <MenuItem primaryText="Card" onClick={() => changeListMode(CARD_MODE)} />
  </IconMenu>
);

IconElementList.propTypes = {
  changeListMode: PropTypes.func.isRequired,
};

export default IconElementList;
