# CoffeeBot Database Design

## Robot
Represents the robot's status and all information related to it.

Components:
- location - robot's current estimated location, updated frequently
- orderQueue - order queue being executed on the robot
- inventory - the robot's current inventory of items

```javascript
{
  "_id": ObjectId
  "location": {
    "x": Number,
    "y": Number
  },
  "orderQueue": [ObjectId],
  "inventory": [
    {
      "item": String,
      "quantity": Number
    }
  ]
}
```

## Order
Represents an order that is placed through the web interface and handled by the robot.

Components:
- user - the name of the user that placed the order
- zone - the rough area of the map where the user said they are located, can be either A, B, C or D
- items - the names of the items that the user has ordered
- status - the status of the order, can be either PENDING, IN_PROGRESS, COLLECTION, COMPLETED, FAILED
- date - this may only be the current date and time

```javascript
{
  "_id": ObjectId,
  "user": String,
  "zone": String,
  "items": [String],
  "status": String,
  "orderedAt": Date
}
```

## Item
Represents an item that our system can deliver. For example, coffee or snacks.

Components:
- name - the name of the item as text, **_unique index_**
- price - the price of the item in pounds

```javascript
{
  "_id": ObjectId,
  "name": String,
  "price": Number
}
```

## User
Represents a user signed up to our system.

Components:
- name - the name of the user as text, this will appear in the web interface when selecting who is ordering, **_unique index_**
- faceImageName - the name of the image file of this user's face, this will be used by the facial recognition component to recognise the user, points to an image in public/images

```javascript
{
  "_id": ObjectId
  "name": String,
  "faceImageName": String,
}
```