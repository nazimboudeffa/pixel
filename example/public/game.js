(function(){

  var game = new Pixel.Game();

  game.init({
      id: 'game',
      width: 400,
      height: 300
  });

/*
  var backgroundLayer = game.createLayer('background');
  var mario = backgroundLayer.createEntity();
  mario.posistion = { x: 0, y: 0 };
  mario.asset = new Pixel.Sprite({name: 'mario.png'});
*/

  game.load(["assets/sprites/mario.png"]);

  game.run();

})()
