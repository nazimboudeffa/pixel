Pixel.Game = function(){
  this.scene = { container: undefined, width: 0, height: 0 };
}

Pixel.Game.prototype.init = function (container) {
  this.scene.container = document.getElementById(container.id);
  this.scene.width = container.width;
  this.scene.height = container.height;
  this._layerKeys = [];
  this._layers = {};
}

Pixel.Game.prototype.createLayer = function (name) {
  var layer = new Pixel.Layer(this);
  this._layers[name] = layer;
  this._layerKeys.push(name);
  return layer;
};

/*
Pixel.Game.prototype.run = function (callback) {
    var loading = this._layerKeys.length;
    for (var k = 0; k < this._layerKeys.length; k++) {
        this._layers[this._layerKeys[k]].load(function () {
            loading -= 1;
            if (loading === 0) {
                callback();
            }
        });
    }
    return this;
};
*/

Pixel.Game.prototype.run = function () {

  var container = this.scene.container;
  var canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;

  var context = canvas.getContext('2d');
  container.appendChild(canvas);

  var image = new Image();
  image.src = Pixel.asset + '/sprites/' + 'mario.png';

  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    context.drawImage(image, 100, 100);
  }, false);

  console.log(context);

};
