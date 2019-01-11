import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function About() {
  return (
    <Card style={{ margin: '1em' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          Learning hooks
        </Typography>
        <Typography component="p">
          This is a example app using react hooks and final-form.
        </Typography>
      </CardContent>
    </Card>
  );
}
