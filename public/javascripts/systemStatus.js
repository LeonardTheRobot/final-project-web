const mapCanvas = $('#map-canvas').get(0);
const mapContext = mapCanvas.getContext('2d');

mapContext.fillStyle = 'red';
const robotSize = 10;
let lastLocation;

/**
 * Transform coordinate object of form: { x: ?, y: ? }, to
 * pixel x and y values to draw on the map
 */
function coordsToPixels(coordObj) {
  return {
    x: mapCanvas.width / 2 - coordObj.x / 0.05,
    y: coordObj.y / 0.05 + mapCanvas.height / 2,
  };
}

function updateMap(robotLocation) {
  if (robotLocation) {
    const rx = robotLocation.x;
    const ry = robotLocation.y;
    if (lastLocation && rx === lastLocation.x && ry === lastLocation.y) {
      console.log('Skip draw (no change)');
    } else {
      console.log('Draw');
      const pixelsObj = coordsToPixels(robotLocation);
      mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
      mapContext.fillRect(pixelsObj.x, pixelsObj.y, robotSize, robotSize);
      lastLocation = robotLocation;
    }
  } else {
    console.log('NO ROBOT LOCATION');
  }
}

function updateOrderQueue(robotOrderQueue) {
  // Clear the table
  $('#order-queue-table-body').empty();
  // Iterate over each order in the queue
  robotOrderQueue.forEach((orderId, i) => {
    $.get(`/api/orders/${orderId}`, (orderData) => {
      // Create a bullet point list of the items in this order
      const itemsList = $('<ul>');
      orderData.items.forEach((item) => {
        itemsList.append($('<li>').text(item));
      });

      // Create a new table row from the data for this order
      const row = $('<tr>').append(
        $('<td>').text(i+1),
        $('<td>').text(orderId),
        $('<td>').text(orderData.user),
        $('<td>').text(orderData.zone),
        $('<td>').append(itemsList),
        $('<td>').text(orderData.status),
      );

      // Append the row in the correct order based on the orderQueue rather than the order in which
      // the order API calls returned
      // If this is the first in the queue or if this is the first API return, place the row first
      // Otherwise, place the row in its correct position based on the index of the forEach loop
      if (i === 0 || $('#order-queue-table-body > tr').length === 0) {
        $('#order-queue-table-body').prepend(row);
      } else {
        $(`#order-queue-table-body > tr:nth-child(${i})`).after(row);
      }
    });
  });
}

function update() {
  $.get('/api/robot', (robotData) => {
    requestAnimationFrame(() => {
      updateMap(robotData.location);
      updateOrderQueue(robotData.orderQueue);
    });
  });
}

update();
setInterval(() => {
  if (lastLocation && $('#auto-update-checkbox').is(':checked')) {
    update();
  } else {
    console.log('Auto-update not checked');
  }
}, 10000);
