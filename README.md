# Foodie

Foodie is a decentralized food delivery system where anyone can order food and anyone can deliver, all while ensuring transparency and quality.

We deploy foodie on **matic network** to ensure efficiency and low write costs.

We use **torus** to login to the Dapp.

**Technical stack**

```solidity``` to write smart contracts.

```Web3``` and ```React``` to write the web app.

```nodejs``` server and ```serviceworkers``` to use push web notifications.

Here is how everything fits together - 

An user can add a restaurant to the Dapp, fill in the menu annd prices.
An intial fund as ```eth``` will be **locked** from the owner's account.

When an orderer places an order, **100%** of the order amount plus **delivery charge** will be locked from the orderer account.

Next, the restaurant approves the order and starts processing food. A **commission percentage** on the order amount will be locked from intial funds given by restaurant.

Next, the system looks for a **deliverer**.

When a deliverer accepts the order, **150%** of the order amount is locked from his account.

When deliverer receives food from restaurant, he approves food receival. At this step, restaurant gets paid the amount of order.

When the orderer receives the ordered food, he approves food receival, the deliverer receives the original **150%** of amount, plus the **delivery charge** plus the **restaurant commission**.

**IF** the restaurant fails to deliver after approving, the deliverer and orderer receives the restaurant commission and their original investments. 

**IF** the delivere fails to deliver after receiving food, the orderer receives his **100%** plus **50%** from deliverer as reimbursement and **restaurant commission** is returned to restaurant.
========
Problem It solves:
* No need of centralised agent.
* Food Orderer, Deliverer and Restaurant all get more benefits than previous system
* Ensure Privacy 

========
Challenges we ran into:
The main challenge was to design the smart contract for our app, as we have to maintain a lot of issues. We also got stucked calling the methods of the smart contract.
