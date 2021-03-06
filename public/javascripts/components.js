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

Crafty.c('Wall', {
    init: function(){
        this.requires('Actor, Solid, wall')
    },
})
Crafty.c('Grass', {
    init: function(){
        this.requires('Actor, Solid, grass')
    },
})

Crafty.c('Score', {
    init: function(){
        this.requires('2D, DOM, Text')
    }
})
/*
   To move player in multi direction

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
            //this.animate('stop', animation_speed, -1); 
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

*/

Crafty.c('Player', {
    init: function(){
        this.requires('Actor, ready_monkey, Gravity, Twoway, Animate, Collision, SpriteAnimation')
        .reel('PlayerMovingLeft', 500, 1, 1, 3)
        .reel('PlayerMovingRight', 500, 3, 0, 3)
        .reel('PlayerRight', 5, 3, 0, 1)
        .reel('PlayerLeft', 5, 1, 1, 1)
        .reel('ShootRight', 500, [[4, 0], [3, 0]])
        .reel('ShootLeft', 500, [[2, 1], [1, 1]])
        .attr({facingRight: true});
    this.onHit('Solid', function(){
        //this.stopAnimation();
        this.stopMovement();
        return this;
    }),
    this.bind('NewDirection', function(data){
        if(data.x > 0) {
            this.facingRight = true
            this.animate('PlayerMovingRight', -1);
        } else if (data.x < 0){
            this.facingRight = false
            this.animate('PlayerMovingLeft', -1); 
        } else {
            this.stopAnimation();
            //this.animate('stop', animation_speed, -1); 
        }
    })
    },
    stopAnimation: function(){
        if(this.facingRight){
            this.animate('PlayerRight', -1); 
        }
        else{
            this.animate('PlayerLeft', -1); 
        }
    },
    stopMovement: function(){
        if (this._speed != 0 && !this.facingRight){
            this.x += this._speed;
        }
        return this;
    }
});

//moveable component 
Crafty.c("moveable",{
    init: function(){
        this.requires('2D, DOM, Collision')
        this.onHit('Solid', this.DestroyObject);
        this.onHit('bullet', function(){
            Crafty.audio.play("shoot");
            this.DestroyObject();
        });
    },
    DestroyObject: function(){
        this.destroy();
    },

})

//create fire component
Crafty.c("Fire",{
    init: function(){
        this.requires('moveable, fire')
        this.bind('EnterFrame', function(){
            this.move('s', Crafty.math.randomNumber(0.6, 4));
        });
        this.onHit('Player', function(){
            Crafty.scene('Game_Over');
        });
    },

})

//create balloon component
Crafty.c("Balloon",{
    init: function(){
        this.requires('moveable, balloon')
        this.bind('EnterFrame', function(){
            this.move('n', Crafty.math.randomNumber(0.6, 6));
        });
    },

})
//create  bullet component 
Crafty.c("bullet", {
    init: function(){
        this.requires('2D, DOM, Collision')
        .destroyOnHit();
    },
    destroyOnHit: function(){
        this.onHit('Solid', this.destroyBullet);
        return this;
    },
    destroyBullet: function(){
        this.destroy();
        return this;
    },
    bullet: function(dir) {
        this.bind("EnterFrame", function() {
            this.move(dir, 5);
            if(this.x > Crafty.viewport.width || this.x < 0) 
            this.destroy();
        });
        return this;
    }
});
