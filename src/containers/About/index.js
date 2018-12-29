import React from "react";
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';

export default function About() {
  return (
    <Card style={{ margin: "1em" }}>
      <CardTitle title="Contacts App" subtitle="Learning rematch" />
      <CardText>This is a example app using rematch and redux-form.</CardText>
    </Card>
  );
}
