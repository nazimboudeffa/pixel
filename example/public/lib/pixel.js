var Pixel = {
    Game: function () { },
    Layer: function () { },
    Entity: function () { },
    Tile: function () { },

    asset: 'assets',

    Keys: {
        Space: 32,
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Shift: 16,
        Control: 17,
        Alt: 18,
        Pause: 19,
        Break: 19,
        CapsLock: 20,
        Escape: 27,
        PageUp: 33,
        PageDown: 34,
        End: 35,
        Home: 36,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Insert: 45,
        Delete: 46,
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five: 53,
        Six: 54,
        Seven: 55,
        Eight: 56,
        Nine: 57,
        Colon: 59,
        NumPadFour: 100,
        NumPadFive: 101,
        NumPadSix: 102,
        NumPadSeven: 103,
        NumPadEight: 104,
        NumPadNine: 105,
        NumPadAsterisk: 106,
        NumPadPlus: 107,
        NumPadMinus: 109,
        Equals: 61,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        NumPadPeriod: 110,
        NumPadSlash: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        Windows: 91,
        ContextMenu: 93,
        NumPadZero: 96,
        NumPadOne: 97,
        NumPadTwo: 98,
        NumPadThree: 99,
        NumLock: 144,
        ScrollLock: 145,
        Pipe: 220,
        BackSlash: 220,
        OpeningSquareBracket: 219,
        OpeningCurlyBracket: 219,
        ClosingSquareBracket: 221,
        ClosingCurlyBracket: 221,
        Comma: 188,
        Period: 190,
        ForwardSlash: 191,
        Tilde: 222,
        Hash: 222
    },

    Directions: {
        Left: 1,
        Right: 2,
        Up: 4,
        Down: 8
    },

    Buttons: {
        Left: 1,
        Right: 2,
        Middle: 4
    }
};

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
  canvas.width = this.scene.width;
  canvas.height = this.scene.width;

  var context = canvas.getContext('2d');
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.fill();

  container.appendChild(canvas);

  var image = new Image();
  image.src = Pixel.asset + '/sprites/' + 'mario.png';

  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    context.drawImage(image, 100, 100);
  }, false);

  console.log(context);

};

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

Pixel.Entity = function (layer) {
    this.asset = undefined;
    this.layer = layer;
    this.pos = { x: 0, y: 0 };
};

Pixel.Entity.prototype.render = function (){
  var image = new Image();
  image.src = Pixel.asset + '/sprites/' + 'mario.png';

  //we use an event listener to be sure that the image has been loaded
  image.addEventListener('load', function() {
    this.layer._ctx.drawImage(image, 100, 100);
  }, false);
}

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
