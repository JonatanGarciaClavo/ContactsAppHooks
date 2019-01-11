import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    width: '300px',
    margin: '1em 0 0 0',
  },
}));

// https://imgur.com/mbZIBzc
const ContactCard = ({ contact, onEditClick, onDeleteClick }) => {
  const classes = useStyles();
  const { name, imgUrl, email, groups, id } = contact;
  const handleEditClick = useCallback(() => {
    onEditClick(id);
  });
  const handleDeleteClick = useCallback(() => {
    onDeleteClick(id);
  });
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={imgUrl || 'http://i.imgur.com/mbZIBzc.png'}
        alt="contact"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography component="p">{email}</Typography>
        <Typography component="p">{groups || 'Without group'}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleEditClick} size="small" color="primary">
          Edit
        </Button>
        <Button onClick={handleDeleteClick} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default memo(ContactCard);
