import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchComponent from './components/search/SearchComponent';
import Activities from './components/activities/Activities';
import Cities from './components/cities/Cities';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: 'lightgrey',
    color: 'grey'
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}><SearchComponent/></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}><Cities/></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}><Activities/></Paper>
          </Grid>
        </Grid>
      </div>
    </div>

  );
}

export default App;