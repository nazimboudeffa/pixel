(function(){

  var game = new Pixel.Game();
  game.init({
      id: 'game',
      width: 400,
      height: 300
  });

  var backgroundLayer = game.createLayer('background');

  game.run();

})()
