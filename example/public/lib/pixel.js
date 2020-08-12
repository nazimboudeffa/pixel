var Pixel = {
    Game: function () { },
    Layer: function () { },
    Entity: function () { },
    Sprite: function () { },
    Tile: function () { },

    path: 'assets',

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
}

Pixel.Game.prototype.init = function (width, height, container, state) {
  this.width = container.width;
  this.height = container.height;
  this.container = document.getElementById(container.id);
  this.state = null;
  this.cache = null;
  this._layerKeys = [];
  this._layers = {};
  //Properties to help track the assets being loaded
  this.toLoad = 0
  this.loaded = 0

  //File extensions for different types of assets
  this.imageExtensions = ["png", "jpg", "gif"]
}

Pixel.Game.prototype.run = function () {

}

Pixel.Game.prototype.createLayer = function (name) {
  var layer = new Pixel.Layer(this);
  this._layers[name] = layer;
  this._layerKeys.push(name);
  return layer;
}

Pixel.Game.prototype.load = function (sources) {
  //The `load` method will return a Promise when everything has
  //loaded
  return new Promise(resolve => {

    //The `loadHandler` counts the number of assets loaded, compares
    //it to the total number of assets that need to be loaded, and
    //resolves the Promise when everything has loaded
    let loadHandler = () => {
      this.loaded += 1;
      console.log(this.loaded);

      //Check whether everything has loaded
      if (this.toLoad === this.loaded) {

        //Reset `toLoad` and `loaded` to `0` so you can use them
        //to load more assets later if you need to
        this.toLoad = 0;
        this.loaded = 0;
        console.log("Assets finished loading");

        //Resolve the promise
        resolve();
      }
    };

    //Display a console message to confirm that the assets are
    //being loaded
    console.log("Loading assets...");

    //Find the number of files that need to be loaded
    this.toLoad = sources.length;

    //Loop through all the source file names and find out how
    //they should be interpreted
    sources.forEach(source => {
      //Find the file extension of the asset
      let extension = source.split(".").pop();

      //Load images that have file extensions that match
      //the imageExtensions array
      if (this.imageExtensions.indexOf(extension) !== -1) {
        this.loadImage(source, loadHandler);
      }
      //Load fonts
      else if (this.fontExtensions.indexOf(extension) !== -1) {
        this.loadFont(source, loadHandler);
      }
      //Load JSON files
      else if (this.jsonExtensions.indexOf(extension) !== -1) {
        this.loadJson(source, loadHandler);
      }
      //Load audio files
      else if (this.audioExtensions.indexOf(extension) !== -1) {
        this.loadSound(source, loadHandler);
      }
      //Display a message if a file type isn't recognized
      else {
        console.log("File type not recognized: " + source);
      }

      //Here's the newer ES6 way of achieving the same thing.
      //At the time of writing there were some browser bugs
      //associated with this, so I haven't used in in the
      //production code
      /*
      //Load images that have file extensions that match
      //the imageExtensions array
      if (this.imageExtensions.find(x => x === extension)) {
        this.loadImage(source, loadHandler);
      }
      //Load fonts
      else if (this.fontExtensions.find(x => x === extension)) {
        this.loadFont(source, loadHandler);
      }
      //Load JSON files
      else if (this.jsonExtensions.find(x => x === extension)) {
        this.loadJson(source, loadHandler);
      }
      //Load audio files
      else if (this.audioExtensions.find(x => x === extension)) {
        this.loadSound(source, loadHandler);
      }
      */
    });
  });
};


Pixel.Game.prototype.loadImage(source, loadHandler) {
  //Create a new image and call the `loadHandler` when the image
  //file has loaded
  let image = new Image();
  image.addEventListener("load", loadHandler, false);
  //Assign the image as a property of the `assets` object so
  //you can access it like this: `assets["path/imageName.png"]`
  this[source] = image;

  //Alternatively, if you only want the file name without the full
  //path, you can get it like this:
  //image.name = source.split("/").pop();
  //this[image.name] = image;
  //This will allow you to access the image like this:
  //assets["imageName.png"];

  //Set the image's `src` property to start loading the image
  image.src = source;
},

loadFont(source, loadHandler) {
  //Use the font's file name as the `fontFamily` name
  let fontFamily = source.split("/").pop().split(".")[0];
  //Append an `@afont-face` style rule to the head of the HTML
  //document. It's kind of a hack, but until HTML5 has a
  //proper font loading API, it will do for now
  let newStyle = document.createElement("style");
  let fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}";
  newStyle.appendChild(document.createTextNode(fontFace));
  document.head.appendChild(newStyle);
  //Tell the `loadHandler` we're loading a font
  loadHandler();
}


Pixel.Game.prototype.render = function (callback) {
    var loading = this._layerKeys.length;
    for (var k = 0; k < this._layerKeys.length; k++) {
        this._layers[this._layerKeys[k]].render();
    }
    return this;
};

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
