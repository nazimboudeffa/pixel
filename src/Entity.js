Pixel.Entity = function (layer) {
    this.asset = undefined;
    this.layer = layer;
    this.pos = { x: 0, y: 0 };
};

Pixel.Entity.prototype.render = function (){
  var image = new Image();
  image.src = Pixel.asset + '/sprites/' + 'mario.png';

  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    this.layer._ctx.drawImage(image, 100, 100);
  }, false);
}
