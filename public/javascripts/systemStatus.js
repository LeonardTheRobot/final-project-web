const mapCanvas = $('#map-canvas').get(0);
const mapContext = mapCanvas.getContext('2d');

mapContext.fillStyle = 'red';
const robotSize = 10;
let lastLocation;

function drawMap(robotData) {
  if (robotData.location) {
    const rx = robotData.location.x;
    const ry = robotData.location.y;
    if (lastLocation && rx === lastLocation.x && ry === lastLocation.y) {
      console.log('Skip draw (no change)');
    } else {
      console.log('Draw');
      const px = (robotData.location.x / 0.05) - (robotSize / 2);
      const py = (robotData.location.y / 0.05) - (robotSize / 2);
      mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
      mapContext.fillRect(px, py, robotSize, robotSize);
      lastLocation = robotData.location;
    }
  } else {
    console.log('NO ROBOT LOCATION');
  }
}

function update() {
  $.get('/api/robot', (robotData) => {
    requestAnimationFrame(() => {
      drawMap(robotData);
    });
  });
}

update();
setInterval(() => {
  update();
  // $.get('/api/robot', (robotData) => {
  // requestAnimationFrame(drawMap);
}, 10000);
