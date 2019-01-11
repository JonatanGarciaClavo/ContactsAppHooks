import React, { useCallback, memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const WITHOUT_GROUP = 'Without group';

const ContactListItem = ({ contact, onClick, onDeleteClick }) => {
  const handleClick = useCallback(() => {
    onClick(contact.id);
  });
  const handleDeleteClick = useCallback(() => {
    onDeleteClick(contact.id);
  });
  return (
    <React.Fragment>
      <ListItem onClick={handleClick}>
        <ListItemAvatar>
          {contact.imgUrl ? (
            <Avatar src={contact.imgUrl} />
          ) : (
            <Avatar>{contact.name.substring(0, 1)}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={contact.name} secondary={contact.groups || WITHOUT_GROUP} />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon onClick={handleDeleteClick} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default memo(ContactListItem);
