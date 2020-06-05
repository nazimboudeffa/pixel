Pixel.Layer = function (engine) {

    this._canvas = undefined;
    this._ctx = undefined;
    this._components = [];

    this.engine = engine;

    this._insertIntoDom();
};

Pixel.Layer.prototype._insertIntoDom = function() {
    var container = this.engine.scene.container;
    this._canvas = document.createElement('canvas');
    this._canvas.width = this.engine.scene.width;
    this._canvas.height = this.engine.scene.height;
    this._canvas.style.position = 'absolute';
    this._canvas.style.top = 0;
    this._canvas.style.left = 0;
    this._canvas.style.width = '100%';
    this._canvas.style.height = '100%';
    this._canvas.className = 'scene-layer';
    this._ctx = this._canvas.getContext('2d');
    container.appendChild(this._canvas);
};

Pixel.Layer.prototype.createEntity = function () {
    var entity = new Pixel.Entity(this);
    this._components.push(entity);

    return entity;
};

Pixel.Layer.prototype.load = function (callback) {
    var loading = this._components.length;
    if (loading === 0) {
        callback();
    }
    else {
        for (var i = 0; i < this._components.length; i++) {
            var c = this._components[i];
            if (c.asset !== undefined && c.asset._prepInfo !== undefined) {
                c.asset.load(c.asset._prepInfo, function () {
                    loading -= 1;
                    if (loading === 0) {
                        callback();
                    }
                });
            }
            else {
                loading -= 1;
                if (loading === 0) {
                    callback();
                }
            }
        }
    }
    return this;
};
