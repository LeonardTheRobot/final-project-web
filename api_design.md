# CoffeeBot API

## Authentication
Currently, no authentication is required.

## Endpoints

### /api/robot
All robot status information including location, order queue, inventory etc.

> GET - retrieve robot information

> PUT - update robot information

### /api/orders
All orders in the system including pending, in progress and completed orders.

> GET - retrieve all orders

> POST - place a new order

### /api/orders/:orderId
One specific order (past or present).

> GET - get information about the order

> PUT - update the status of the order
