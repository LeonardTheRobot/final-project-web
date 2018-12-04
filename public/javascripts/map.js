export default class Map {
  constructor(canvasObject) {
    this.mapCanvas = canvasObject.get(0);
    this.mapContext = this.mapCanvas.getContext('2d');
    this.robotSize = 10;
    this.lastLocation = {};
    this.getZones();
  }

  getZones() {
    $.get('/javascripts/zones.json', (zones) => {
      this.zoneLocations = zones;
    });
  }

  /**
   * Transform coordinate object of form: { x: ?, y: ? }, to
   * pixel x and y values to draw on the map
   */
  coordsToPixels(coordObj) {
    return {
      x: Math.round(this.mapCanvas.width / 2 - coordObj.x / 0.05),
      y: Math.round(coordObj.y / 0.05 + this.mapCanvas.height / 2),
    };
  }

  update(robotLocation) {
    if (robotLocation) {
      const rx = robotLocation.x;
      const ry = robotLocation.y;
      if (this.lastLocation && rx === this.lastLocation.x && ry === this.lastLocation.y) {
        console.log('Skip draw (no change)');
      } else {
        console.log('Draw');
        const pixelsObj = this.coordsToPixels(robotLocation);
        const robotOffset = this.robotSize / 2;
        this.mapContext.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
        this.mapContext.fillStyle = 'red';
        this.mapContext.fillRect(
          pixelsObj.x - robotOffset,
          pixelsObj.y - robotOffset,
          this.robotSize,
          this.robotSize,
        );
        this.mapContext.fillStyle = 'blue';
        this.zoneLocations.forEach((zone) => {
          const zonePixels = this.coordsToPixels(zone);
          console.log(zonePixels);
          this.mapContext.fillRect(
            zonePixels.x,
            zonePixels.y,
            5,
            5,
          );
        });
        this.lastLocation = robotLocation;
      }
    } else {
      console.log('NO ROBOT LOCATION');
    }
  }
}
