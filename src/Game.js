Pixel.Game = function(){
  this.scene = { container: undefined, width: 0, height: 0 };
}

Pixel.Game.prototype.init = function (canvas) {
  this.scene.container = document.getElementById(canvas.container);
  this.scene.width = canvas.width;
  this.scene.height = canvas.height;
  this._layerKeys = [];
  this._layers = {};
}

Pixel.Game.prototype.createLayer = function (name) {
  var layer = new Pixel.Layer(this);
  this._layers[name] = layer;
  this._layerKeys.push(name);
  return layer;
};

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
