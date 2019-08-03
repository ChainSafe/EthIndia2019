import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    minWidth: 300,
    margin: 15
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    marginRight: 20
  },
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
    <div style={{ margin: "0px 10%" }}>
      <div style={{ display: "flex", margin: "40px 0px", alignItems: "center" }}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          {props.restaurant.name[0]}
        </Avatar>
        <div>
          <Typography variant="h4">
            {props.restaurant.name}
          </Typography>
          <Typography variant="caption">
            {props.restaurant.address + " - " + props.restaurant.area}
          </Typography>
        </div>
        <div style={{ flex: 1 }} />
        <Button color="primary" style={{ margin: "0px 20px", maxHeight: 40 }} onClick={() => props.setRestaurant(undefined)}>
          Back
        </Button>
        <Button variant="contained" style={{ maxHeight: 40 }} color="primary" onClick={props.setCheckout}>Checkout</Button>
      </div>
      {
        props.menu.map((menuItem, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
            <Typography style={{ width: 200 }} variant="h6">{menuItem.name}</Typography>
            <div style={{ flex: 1 }} />
            <Typography style={{ width: 100 }} variant="body1">{"$  " + menuItem.price}</Typography>
            <Button variant="outlined" color="primary" onClick={() => props.addToOrder(i)}>+</Button>
            <Typography variant="body1" style={{ margin: "0px 20px" }}>{props.order[i]}</Typography>
            <Button variant="outlined" color="primary" onClick={() => props.removeFromOrder(i)}>-</Button>
          </div>
        ))
      }
    </div >
  );
}