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

function updateMap(robotData) {
  if (robotData.location) {
    const rx = robotData.location.x;
    const ry = robotData.location.y;
    if (lastLocation && rx === lastLocation.x && ry === lastLocation.y) {
      console.log('Skip draw (no change)');
    } else {
      console.log('Draw');
      const pixelsObj = coordsToPixels(robotData.location);
      mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
      mapContext.fillRect(pixelsObj.x, pixelsObj.y, robotSize, robotSize);
      lastLocation = robotData.location;
    }
  } else {
    console.log('NO ROBOT LOCATION');
  }
}

function update() {
  $.get('/api/robot', (robotData) => {
    requestAnimationFrame(() => {
      updateMap(robotData);
    });
  });
}

update();
setInterval(() => {
  if ($('#auto-update-checkbox').is(':checked')) {
    update();
  } else {
    console.log('Auto-update not checked');
  }
}, 1000);
