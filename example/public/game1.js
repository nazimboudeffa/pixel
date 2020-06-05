(function(){

  var game = new Pixel.Game();
  game.init({
      container: 'game',
      width: 800,
      height: 600
  });

  var backgroundLayer = game.createLayer('background');
  var grass = backgroundLayer.createEntity();
  grass.pos = { x: 0, y: 0 };
  grass.asset = new Pixel.Tile();
  grass.asset.prepare({
      name: 'grass.png',
      size: {
          width: 800,
          height: 600
      }
  });

  game.run();

})()
