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
