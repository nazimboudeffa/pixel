Pixel.Tile = function () {
    "use strict";
    this._prepInfo = undefined;
    this._scaledTile = new Image();
};

Pixel.Tile.prototype.prepare = function (info) {
    this._prepInfo = info;
    return this;
};

Pixel.Tile.prototype.load = function (info, callback) {
    var self = this;

    if (info !== undefined) {
        if (info.name !== undefined) {
            this.name = info.name;
        }

        if (info.size !== undefined) {
            this.size = info.size;
        }

        if (info.callback !== undefined) {
            this.onLoad(info.callback);
        }
    }

    var img = new Image();
    img.onload = function () {
        var buffer = document.createElement('canvas');
        var ctx = buffer.getContext('2d');
        var pattern = ctx.createPattern(this, "repeat");

        buffer.width = self.size.width;
        buffer.height = self.size.height;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, self.size.width, self.size.height);

        self._scaledTile.onload = function () {
            self.loaded = true;
        };

        self._scaledTile.src = buffer.toDataURL();
    };

    img.src = Pixel.assetPath + '/tiles/' + this.name;
    
    return this;
};

Pixel.Tile.prototype.update = function (elapsedTime, dt) {
};

Pixel.Tile.prototype.draw = function (entity) {
    if (this.loaded) {
        entity.layer.drawImage(this._scaledTile, entity.pos.x, entity.pos.y, undefined, entity.opacity);
    }

    return this;
};
