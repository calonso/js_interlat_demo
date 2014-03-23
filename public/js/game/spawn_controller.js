
(function(){
  GAME.SpawnController = function() {
    this.level = 1;
    this.elapsed = GAME.SPAWN_WAIT_TIME;
  };

  GAME.SpawnController.prototype = {
    level: null,
    elapsed: null,
    update: function(delta) {
      this.elapsed += delta;

      if (this.elapsed > GAME.SPAWN_WAIT_TIME) {
        this.elapsed = 0;

        for (var i = 1; i <= GAME.SPAWN_SIZE; ++i) {
          GAME.CURRENT_GAME.add_object(new GAME.Enemy(this.level, i));
        };

        this.level += 1;
      }
    }
  };

})();