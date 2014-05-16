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
        this.requires('Actor, Multiway, ready_monkey, Collision, SpriteAnimation')
        .multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
        .stopOnSolids()
        .reel('PlayerMovingLeft', 500, 1, 1, 3)
        .reel('PlayerMovingRight', 500, 3, 0, 3)
        .reel('stop', 10, 1, 0, 1);

    var animation_speed = 8;
    this.bind('NewDirection', function(data){
        if(data.x > 0) {
            this.animate('PlayerMovingRight', animation_speed, -1);
        } else if (data.x < 0){
            this.animate('PlayerMovingLeft', animation_speed, -1); 
        } else {
            this.animate('stop', animation_speed, -1); 
        }
    
    })
    },
    stopOnSolids: function(){
        this.onHit('Solid', this.stopMovement);
        return this;
    },
    stopMovement: function(){
        this._speed = 0;
        if (this._movement){
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }
});

Crafty.c('Player1', {
    init: function(){
        this.requires('Actor, ready_monkey')
    }
});
