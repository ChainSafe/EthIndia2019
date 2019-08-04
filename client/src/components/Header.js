import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.main
  },
  button: {
    minWidth: 100,
    margin: "0px 5px"
  },
  activeButton: {
    minWidth: 100,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    margin: "0px 5px"
  },
  appbar: {
    backgroundColor: "transparent"
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DEL DAPP
          </Typography>
          <Button className={props.tab === 0 ? classes.activeButton : classes.button} color="primary" onClick={() => props.setTab(0)}>Order</Button>
          <Button className={props.tab === 1 ? classes.activeButton : classes.button} color="primary" onClick={() => props.setTab(1)}>Deliver</Button>
          <Button className={props.tab === 2 ? classes.activeButton : classes.button} color="primary" onClick={() => props.setTab(2)}>Add restaurant</Button>
          <Button className={props.tab === 3 ? classes.activeButton : classes.button} color="primary" onClick={() => props.setTab(3)}>Restaurant Orders</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}