Pixel.Entity = function (layer) {
  this.layer = layer;
  this.asset = undefined;
  this.image = new Image();
  this.position = { x: 0, y: 0 };
};

Pixel.Entity.prototype.render = function (){
  var layer = this.layer;
  var image = new Image();
  image.src = Pixel.path + '/sprites/' + 'mario.png';
  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    layer.context.drawImage(image, 100, 100);
  }, false);
}

Pixel.Entity.prototype.load = function (){
  var self = this;
  this.image.src = Pixel.path + '/sprites/' + 'mario.png';
  this.image.onload = function () {
      self.image.onload = undefined;
      self.loaded = true;
  };
  return this;
}

Pixel.Entity.prototype.draw = function() {
    this.asset.draw(this);
    return this;
};
