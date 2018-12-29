import React from "react";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import CardMedia from "material-ui/Card/CardMedia";
import CardTitle from "material-ui/Card/CardTitle";
import CardActions from "material-ui/Card/CardActions";
import FlatButton from "material-ui/FlatButton";

// https://imgur.com/mbZIBzc
const ContactCard = ({ contact, onEditClick, onDeleteClick, big }) => {
  const { name, imgUrl, email, groups } = contact;
  return (
    <Card style={{ width: big ? "auto" : "300px", margin: "1em 0 0 0" }}>
      <CardMedia
        mediaStyle={{ textAlign: "center" }}
        overlay={<CardTitle title={name} />}
      >
        <img
          alt="contact"
          src={imgUrl || "http://i.imgur.com/mbZIBzc.png"}
          style={{
            height: "auto",
            width: "auto",
            maxWidth: 300,
            minWidth: 300,
            maxHeight: 300
          }}
        />
      </CardMedia>
      <CardTitle
        titleStyle={{ fontSize: "12pt" }}
        title={email}
        subtitle={groups || "Without group"}
      />
      <CardActions>
        <FlatButton onClick={onEditClick} label="Edit" />
        <FlatButton onClick={onDeleteClick} label="Delete" />
      </CardActions>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default ContactCard;
