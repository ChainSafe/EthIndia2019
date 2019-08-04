
import FoodieContract from "../contracts/Food";
import getWeb3 from "../utils/getWeb3";
let contract = null, account = null;

export async function initiateContract() {
  const web3 = await getWeb3();
  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();
  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = FoodieContract.networks[networkId];

  const instance = new web3.eth.Contract(
    FoodieContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  contract = instance;
  account = accounts[0];
  
}

const GAS_COST: number = 3000000;

export function getContract () {
  return contract;
}

export async function addArea(area: string) {
  try {
    const response = await contract.methods.addArea(area).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getArea(areaId: number): string {
  try {
    const result = await contract.methods.getArea(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack)
  }
  return null;
}

export async function getAreas(): string[]{
  try {
    const result = await contract.methods.getAreas().call();
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function addRestaurant(name: string, address: string, areaId: number, fund: number){
  try {
    const response = await contract.methods.addRestaurant(name, address, areaId).send({ from: account, gas: GAS_COST, value: fund});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getRestaurant(restuarentId: number): any {
  try {
    const result = await contract.methods.getRestaurant(restuarentId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
    return null;
  }
}

export async function addItem(restuarentId: number, name: string, price: number){
  try {
    const response = await contract.methods.addItem(restuarentId, name, price).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getItem(restuarentId: number, itemId: number): number{
  try {
    const result = await contract.methods.getItem(restuarentId, itemId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function register(name: string, addr: string, phoneNo: number){
  try {
    const response = await contract.methods.register(name, addr, phoneNo).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}
export async function placeOrder(
  items: number[], quantities: number[], areaId: number, fullAddress: string, restId: number, price: number){
  try {
    const response = await contract.methods.placeOrder(items, quantities, areaId,
      fullAddress, restId).send({from: account, gas: GAS_COST, value: price});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getOrder(orderId: number): any {
  try {
    const result = await contract.methods.getOrder(orderId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}
export async function cancelOrder(orderId: number): any {
  try {
    const result = await contract.methods.cancelOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}
export async function receiveOrder(orderId: number): any {
  try {
    const result = await contract.methods.receiveOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function approveOrder(orderId: number): any {
  try {
    const result = await contract.methods.approveOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function reclaim(orderId: number): any {
  try {
    const result = await contract.methods.reclaim(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function searchAreaRestaurant(areaId: number): any {
  try {
    const result = await contract.methods.searchAreaRestaurant(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function searchAreaOrder(areaId: number): any {
  try {
    const result = await contract.methods.searchAreaOrder(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function getLockedBalanceForDelivery(orderId: number) {
  try {
    const result = await contract.methods.getLockedBalanceForDelivery(orderId).call();
    console.log(result);
  }catch (e) {
    console.log(e);
  }
}

export async function acceptOrder(orderId: number, fund: number) {
  try {
    const result = await contract.methods.acceptOrder(orderId).send({from: account, gas: GAS_COST, value: fund});
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function confirmPickup(orderId: number) {
  try {
    const result = await contract.methods.confirmPickup(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}

export function lisenEvent(contract) {
  // contract.events.newRestaurant({
  //   filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  //   fromBlock: 0
  // }, function(error, event){ console.log(event); })
  //   .on('data', function(event){
  //     console.log(event); // same results as the optional callback above
  //   })
  //   .on('changed', function(event){
  //     // remove event from local database
  //   })
  //   .on('error', console.error);
// watch for changes
  var event = contract.newRestaurant();
  event.watch(function (error, result) {
    // result will contain various information
    // including the argumets given to the `Deposit`
    // call.
    if (!error)
      console.log(result);
  });
}