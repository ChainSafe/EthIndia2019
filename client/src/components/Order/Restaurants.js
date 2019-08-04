import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import RestaurantCard from "./RestaurantCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  writing: {
    color: theme.palette.writing.main
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.restaurants.length ?
        props.restaurants.map((restaurant, i) => (
          <RestaurantCard key={i} restaurant={restaurant} setRestaurant={props.setRestaurant} index={i} showMenu={props.showMenu}/>
        ))
        : !props.area ? <Typography variant="body2" className={classes.writing}>
          Select area to show restaurants.
        </Typography> :
          <Typography variant="body2" className={classes.writing}>
            No restaurants in this area.
        </Typography>
      }
    </div>
  );
}