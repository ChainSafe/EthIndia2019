import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Button, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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

export default function Checkout(props) {
  const classes = useStyles();
  const [address, setAddress] = React.useState("");

  const getTotal = () => {
    let total = 0;
    props.menu.forEach((element, i) => {
      total += element.price * props.order[i];
    });
    return total;
  }

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
        <Button color="primary" style={{ maxHeight: 40 }} onClick={() => props.setCheckout(false)}>
          Back
        </Button>
      </div>
      <div>
        {props.menu.map((menuItem, i) => (
          props.order[i] ?
            <div key={i} style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
              <Typography variant="h6" style={{ width: 200 }}>{menuItem.name}</Typography>
              <Typography variant="body1" style={{ width: 100 }}>{"$ " + menuItem.price + " x " + props.order[i]}</Typography>
              <div style={{ flex: 1 }} />
              <Typography variant="h6">{"$ " + menuItem.price * props.order[i]}</Typography>
            </div>
            : null
        ))}
        <Divider />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div style={{ flex: 1 }} />
          <Typography variant="h6">Total : </Typography>
          <Typography style={{ marginLeft: 10 }} variant="h6">$ {getTotal()}</Typography>
        </div>

        {getTotal() > 0 ?
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }} />
            <div style={{display: "flex",  flexFlow: "column"}}>
              <TextField
                id="address"
                label="Order address"
                multiline
                rows={2}
                style={{minWidth: 300}}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
              />
              <Button disabled={props.loading} variant="contained" color="primary" width={100}
                style={{ marginTop: 20 }} onClick={() => props.confirmOrder(address)}>
                Confirm order
                </Button>
            </div>
          </div> : null
        }
      </div>
    </div>
  );
}