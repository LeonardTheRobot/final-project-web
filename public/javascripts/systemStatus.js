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
  console.log(`Order Queue:\n${JSON.stringify(robotOrderQueue)}`);
  robotOrderQueue.forEach((orderId) => {
    $.get(`/api/orders/${orderId}`, (orderData) => {
      console.log(`Order Data ${orderId}:\n${JSON.stringify(orderData)}`);
      const itemsList = $('<ul>');
      orderData.items.forEach((item) => {
        itemsList.append($('<li>').text(item));
      });
      // const itemsList = $('<ul>').append(
      //   $('<li>').text()
      // );
      const tableRow = $('<tr>').append(
        $('<td>').text(orderId),
        $('<td>').text(orderData.user),
        $('<td>').text(orderData.zone),
        $('<td>').append(itemsList),
        $('<td>').text(orderData.status),
      ).appendTo('#order-queue-table-body');
      console.log(tableRow);
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
