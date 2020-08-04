Pixel.Game = function(){
}

Pixel.Game.prototype.init = function (width, height, container, state) {
  this.width = container.width;
  this.height = container.height;
  this.container = document.getElementById(container.id);
  this.state = null;
  this.cache = null;
  this._layerKeys = [];
  this._layers = {};
}

Pixel.Game.prototype.run = function () {
  
}

Pixel.Game.prototype.createLayer = function (name) {
  var layer = new Pixel.Layer(this);
  this._layers[name] = layer;
  this._layerKeys.push(name);
  return layer;
};

Pixel.Game.prototype.load = function () {
    for (var k = 0; k < this._layerKeys.length; k++) {
        this._layers[this._layerKeys[k]].load();
    }
    return this;
};

Pixel.Game.prototype.render = function (callback) {
    var loading = this._layerKeys.length;
    for (var k = 0; k < this._layerKeys.length; k++) {
        this._layers[this._layerKeys[k]].render();
    }
    return this;
};
