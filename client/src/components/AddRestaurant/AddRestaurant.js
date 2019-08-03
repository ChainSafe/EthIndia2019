import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { addArea, addRestaurant, addItem } from '../../code/functions';
import Loading from "../Loading";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexFlow: "column"
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
  iconButton: {
    width: 40,
    height: 40,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

export default function Checkout(props) {
  const classes = useStyles();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [values, setValues] = React.useState({
    name: '',
    fullAddress: '',
    area: 0,
    fund: 0,
  });

  const [area, setArea] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadingR, setLoadingR] = React.useState(false);

  const [menu, setMenu] = React.useState([
    { name: "", price: 0 }
  ]);

  const addToMenu = () => {
    let menuCopy = menu;
    menuCopy.push({ name: "", price: 0 });
    setMenu([...menuCopy]);
  }

  const removeFromMenu = (i) => {
    let menuCopy = menu;
    menuCopy.splice(i, 1);
    setMenu([...menuCopy]);
  }

  const handleMenuChange = (i, field, e) => {
    let menuCopy = menu;
    menuCopy[i][field] = e.target.value;
    setMenu([...menuCopy]);
  }

  const addAreaLocal = async () => {
    setLoading(true);
    await addArea(area)
    setLoading(false);
  };

  const addRestaurantAll = async () => {
    setLoadingR(true);
    console.log(values);
    if (values.name && values.fullAddress && values.area && values.fund && menu.length) {
      await addRestaurant(values.name, values.fullAddress, parseInt(values.area), parseInt(values.fund));
      for (let i = 0; i < menu.length; i++) {
        await addItem(0, menu[i].name, parseInt(menu[i].price));
      }
    }
    setLoadingR(false);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "30px 0px" }}>
        <Typography variant="h5">ADD RESTAURANT</Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="fullAddress"
            label="Full address"
            multiline
            rows={3}
            className={classes.textField}
            value={values.fullAddress}
            onChange={handleChange('fullAddress')}
            margin="normal"
          />
          <TextField
            id="fund"
            label="Initial fund"
            className={classes.textField}
            value={values.fund}
            onChange={handleChange('fund')}
            margin="normal"
          />
          <FormControl className={classes.formControl}>
            <FormHelperText>Area to place order in</FormHelperText>
            <NativeSelect
              className={classes.selectEmpty}
              value={values.area}
              name="area"
              onChange={handleChange('area')}
              inputProps={{ 'aria-label': 'area' }}
            >
              <option value="" disabled>Select an area</option>
              {props.areas.map((area, i) => (
                <option key={i} value={i}>{area}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <Typography variant="h5" style={{ marginTop: 30 }}>MENU</Typography>
          {menu.map((menuItem, i) => (
            <div key={i} style={{ margin: "20px 0px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <TextField
                  label="item name"
                  className={classes.textField}
                  value={menu[i].name}
                  onChange={(e) => handleMenuChange(i, "name", e)}
                />
                {menu.length > 1 ?
                  <Button className={classes.iconButton} variant="outlined" color="primary" onClick={() => removeFromMenu(i)}>-</Button> : null
                }
              </div>
              <TextField
                label="item price"
                className={classes.textField}
                value={menu[i].price}
                onChange={(e) => handleMenuChange(i, "price", e)}
              />
            </div>
          ))
          }
          <Button className={classes.iconButton} style={{ marginTop: 20 }} variant="outlined" color="primary" onClick={addToMenu}>+</Button>
        </form>
        <Button variant="contained" color="primary" style={{ width: 500, height: 40, margin: "40px 0px" }} disabled={loadingR} onClick={addRestaurantAll}>
          {loadingR ? <Loading height={30} /> : "Add restaurant"}
        </Button>
        <div>
          <TextField
            id="area"
            label="Area"
            className={classes.textField}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary"
            style={{ width: 500, height: 40, margin: "40px 0px" }}
            onClick={addAreaLocal} disabled={loading}
          >
            Add area
          </Button>
        </div>
      </div>
    </div>
  );
}