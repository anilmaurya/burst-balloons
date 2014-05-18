Game = {

    map_grid: {
        width: window.innerWidth/16,
        height: window.innerHeight/16,
        tile: {
            width: 16,
            height: 16
        }
    },

    score: 0,

    width: function(){
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function(){
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function(){
        Crafty.init(Game.width(), Game.height());
        Crafty.background('white');
        Crafty.scene('Loading');
    }
}
