Pixel.Entity = function (layer) {
  this.layer = layer;
  this.asset = undefined;
  this.image = new Image();
  this.position = { x: 0, y: 0 };
  this.loaded = false;
};

Pixel.Entity.prototype.load = function (){
  var self = this;
  self.loaded = true;
  //we use an event listener to be sure that the image has been loaded
  this.image.addEventListener('load', this.draw(), false);
  this.image.src = Pixel.path + '/sprites/' + 'mario.png';
  return this;
}

Pixel.Entity.prototype.draw = function() {
    //this.asset.draw(this);
    console.log(this.loaded);
    if (this.loaded){
      this.layer.context.drawImage(this.image, 0, 0, 32, 32, 100, 100, 32, 32);
    }
    return this;
};
