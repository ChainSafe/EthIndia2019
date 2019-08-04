import React, { Component } from 'react';
import MasterLayout from './layouts/MasterLayout';
import { initiateContract } from './code/functions';

class App extends Component {

  state = { loading: true};

  componentDidMount = async () => {
    try {

      // // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      // // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();
      // // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = FoodieContract.networks[networkId];

      // const instance = new web3.eth.Contract(
      //   FoodieContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // //testing smart contract ....
      // //All functions test....

      // // functions.addArea("demo", instance, accounts[0]);
      // // functions.getArea(0, instance);
      // //functions.getAreas(instance);
      // //functions.addRestaurant("Test Name", "demo", 0, instance, accounts[0]);
      // //functions.getRestaurant(5, instance);
      // //functions.addItem(5, "Fish", 200, instance, accounts[0]);
      // //functions.getItem(5, 0, instance);
      // //functions.register("User 1", "0xXXXXXXXX", instance, accounts[0]);


      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      await initiateContract();
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (this.state.loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <MasterLayout />
      // "hello"
    );
  }
}

export default App;
