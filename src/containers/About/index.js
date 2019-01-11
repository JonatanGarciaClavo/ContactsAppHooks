import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  card: { margin: '1em' },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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
