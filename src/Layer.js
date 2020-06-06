Pixel.Layer = function (game) {
    this.canvas = undefined;
    this.context = undefined;
    this.components = [];
    this.game = game;
};

Pixel.Layer.prototype.createEntity = function () {
    var entity = new Pixel.Entity(this);
    this.components.push(entity);
    return entity;
};

Pixel.Layer.prototype.load = function () {
    for (var i = 0; i < this.components.length; i++) {
        var c = this.components[i];
        c.load();
    }
    return this;
};

Pixel.Layer.prototype.render = function(){
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.game.scene.width;
  this.canvas.height = this.game.scene.width;
  this.context = this.canvas.getContext('2d');
  this.context.beginPath();
  this.context.rect(0, 0, this.canvas.width, this.canvas.height);
  this.context.fillStyle = "blue";
  this.context.fill();
  this.game.scene.container.appendChild(this.canvas);
  for (var i = 0; i < this.components.length; i++) {
      var c = this.components[i];
      c.draw();
  }
  return this;
}

Pixel.Layer.prototype.update = function(elapsedTime, dt) {
    for (var i = 0; i < this.components.length; i++) {
        this.components[i].update(elapsedTime, dt);
    }
    return this;
};
