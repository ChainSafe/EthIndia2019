import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Restaurants from "./Restaurants";
import Menu from "./Menu";
import Checkout from "./Checkout";
import { searchAreaRestaurant, getRestaurant, getOrder, getItem, placeOrder, getContract } from "../../code/functions";

const delivery_fee = 100; 

const useStyles = makeStyles(theme => ({
  root: {
    margin: "20px 10px 50px 10px"
  },
  cardDelivery: {
    margin: "15px 0px",
    border: "1px solid",
    borderColor: theme.palette.primary.main
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    minWidth: 240
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    area: '',
  });

  const [checkout, setCheckout] = React.useState(false);

  const handleChange = name => async event => {
    let temp = event.target.value;
    setState({
      ...state,
      [name]: temp,
    });
    let res = await searchAreaRestaurant(parseInt(temp));
    if (res) {
      let tempRes = [];
      res[0].forEach((resItem, i) => {
        tempRes.push({
          id: res[0][i],
          name: res[1][i],
          address: res[2][i],
          area: props.areas[parseInt(temp)]
        })
      })
      setRestaurants([...tempRes]);
    }
  };

  const [order, setOrder] = React.useState([]);
  const constructOrder = (len) => {
    let data = [];
    for (let i = 0; i < len; i++) data.push(0);
    return data;
  }

  const showMenu = async (index) => {
    let myRes = await getRestaurant(restaurants[index].id);
    console.log(myRes);
    let itemCount = parseInt(myRes.itemCount);
    let newItems = [];
    for(let i=0; i<itemCount; i++) {
      let newItem = await getItem(restaurants[index].id, i);
      newItems.push({
        name: newItem.name,
        price: parseInt(newItem.price)
      });
    }
    setRestaurant(restaurants[index]);
    setMenu([...newItems]);
    setOrder([...constructOrder(newItems.length)]);
  }

  const [restaurants, setRestaurants] = React.useState([]);

  const [restaurant, setRestaurant] = React.useState(undefined);
  const [menu, setMenu] = React.useState([]);

  const [orders, setOrders] = React.useState([
    {
      name: "Tanmoy",
      phone: "xxx xxx xx",
      fullAddress: "Right here, right now",
      restaurant: {
        name: "Matt over",
        items: [
          { name: "idli", price: 20, count: 3 }
        ]
      },
      amount: 40,
      area: "Bangalore",
      res_approved: false
    }
  ])

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let instance = getContract();
    instance.events.newOrder({}, function (error, event) { console.log(event); })
      .on('data', function (event) {
        orderProcess(event);        
      })
      .on('changed', function (event) {
        console.log("Event changed"); // same results as the optional callback above
      })
      .on('error', function (error) {
        console.log(error);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderProcess = async (order) => {
    console.log(order);
    let orderItem = await getOrder(parseInt(order.returnValues.orderId));
    console.log(orderItem);
    setLoading(false);
    setCheckout(false);
    setRestaurant(undefined);
  }

  const confirmOrder = async (orderAddress) => {
    let itemsSelected = [];
    let quantities = [];
    let total = 0;
    order.forEach((orderCount, i) => {
      if(orderCount > 0) {
        itemsSelected.push(i);
        quantities.push(orderCount);
        total += menu[i].price * orderCount;
      }
    })
    total += delivery_fee;
    setLoading(true);
    await placeOrder(itemsSelected, quantities, state.area, orderAddress, restaurant.id, total);
  }


  const addToOrder = (index) => {
    let orderCopy = order;
    orderCopy[index]++;
    setOrder([...orderCopy]);
  }

  const removeFromOrder = (index) => {
    let orderCopy = order;
    if (orderCopy[index] > 0) orderCopy[index]--;
    setOrder([...orderCopy]);
  }

  return (
    <div className={classes.root}>
      {checkout ?
        <Checkout restaurant={restaurant} menu={menu} order={order} loading={loading}
          setRestaurant={setRestaurant} setCheckout={setCheckout} confirmOrder={confirmOrder}/>
        :
        restaurant ?
          <Menu restaurant={restaurant} menu={menu}
            setRestaurant={setRestaurant} order={order} addToOrder={addToOrder}
            removeFromOrder={removeFromOrder} setCheckout={setCheckout} 
            />
          : <div>
            {orders.length ?
              <div style={{ margin: "30px 0px" }}>
                <Typography variant="h5" style={{ fontWeight: "bold", margin: "30px 0px" }}>
                  My current orders
                </Typography>
                {orders.map((order, i) => (
                  <Card key={i} className={classes.cardDelivery}>
                    <CardContent>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          <Typography variant="h6">{order.restaurant.name}</Typography>
                          {order.restaurant.items.map((item, i) => (
                            <div key={i} style={{ display: "flex" }}>
                              <Typography variant="body2">{item.name}</Typography>
                              <Typography variant="body2">{"$ " + item.price + " x " + item.count}</Typography>
                            </div>
                          ))
                          }
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography variant="h6">{order.name}</Typography>
                          <Typography variant="body2">{order.fullAddress}</Typography>
                          <Typography variant="body2">{order.phone}</Typography>
                        </div>
                        <div>
                          <Typography variant="h6">{"$ " + order.amount}</Typography>
                          <Typography variant="body2">{order.area}</Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
                }
              </div>
              : null
            }
            <div style={{ display: "flex", flex: 1, marginBottom: 40 }}>
              <div style={{ marginTop: 25 }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Order food
                </Typography>
                <Typography variant="body1" style={{ fontStyle: "italic" }}>
                  while making a difference
                </Typography>
              </div>
              <div style={{ flex: 1 }} />
              <FormControl className={classes.formControl}>
                <FormHelperText>Area to place order in</FormHelperText>
                <NativeSelect
                  className={classes.selectEmpty}
                  value={state.area}
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
            </div>
            <Restaurants restaurants={restaurants} setRestaurant={setRestaurant} area={state.area} 
              showMenu={showMenu}/>
          </div>
      }
    </div>
  );
}