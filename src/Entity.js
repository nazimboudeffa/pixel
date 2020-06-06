Pixel.Entity = function (layer) {
    this.layer = layer;
    this.position = { x: 0, y: 0 };
};

Pixel.Entity.prototype.render = function (){
  var layer = this.layer;
  var image = new Image();
  image.src = Pixel.asset + '/sprites/' + 'mario.png';
  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    layer.context.drawImage(image, 100, 100);
  }, false);
}
