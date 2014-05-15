Crafty.c('Grid',{
    init: function(){
        this.attr({
            w: Game.map_grid.tile.width,
        h: Game.map_grid.tile.height
        })
    },
at: function(x,y){
    if (x === undefined && y === undefined){
        return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
        this.attr({x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height});
        return this;
    }
}
});

Crafty.c('Actor', {
    init: function(){
        this.requires('2D, Canvas, Grid');
    },
});

Crafty.c('Player', {
    init: function(){
        this.requires('Actor, Multiway, ready_monkey')
        .multiway({x: 1, y: 4}, {UP_ARROW: -90, DOWN_ARROW: 90});
    }
});

Crafty.c('Player1', {
    init: function(){
        this.requires('Actor, ready_monkey')
    }
});
