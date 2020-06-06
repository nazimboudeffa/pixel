Pixel.Entity = function (layer) {
  this.layer = layer;
  this.asset = undefined;
  this.image = new Image();
  this.position = { x: 0, y: 0 };
  this.loaded = false;
};

Pixel.Entity.prototype.load = function (){
  var self = this;
  this.image.src = Pixel.path + '/sprites/' + 'mario.png';
  //we use an event listener to be sure that the image has been loaded
  this.image.addEventListener('load', function() {
    //self.layer.context.drawImage(self.image, 100, 100);
    self.loaded = true;
  }, false);
  return this;
}

Pixel.Entity.prototype.draw = function() {
    //this.asset.draw(this);
    if (this.loaded){
      this.layer.context.drawImage(this.image, 200, 100);
    }
    return this;
};
