Pixel.Sprite = function (info) {
    this.info = info;
    this.image = new Image();
};

Pixel.Sprite.prototype.load = function (info) {
    var self = this;
    this.image.src = Pixel.path + '/sprites/' + this.info.name;
    this.image.onload = function () {
        self.image.onload = undefined;
        self.loaded = true;
    };
    return this;
};

Pixel.Sprite.prototype.draw = function (entity) {
    entity.layer.drawImage(this.image, entity.pos.x, entity.pos.y, this.rotation, entity.opacity);
    return this;
};
