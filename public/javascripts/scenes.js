Crafty.scene('Game', function(){
    //Crafty.e('Player').at(5,5);
    /*var mouseTracker = Crafty.e("2D, Mouse").attr({w: Game.width(), h: Game.height(), x: 0, y: 0});
    mouseTracker.bind('MouseMove', function(e){
        player.x = Crafty.mousePos.x;
        player.y = Crafty.mousePos.y;
    });
    */
    var stair_length = 5;
    var stair_height = (1/3)* Game.map_grid.height;
    for (var x = 0; x < Game.map_grid.width; x++) {
        var increment_stair_length = false;
        for (var y = 0; y < Game.map_grid.height; y++){
            var at_edge = x == 0 || x > Game.map_grid.width - 3  || y == 0 || y > Game.map_grid.height - 3;
            if (at_edge) {
                Crafty.e('Wall').at(x,y);
            }
            if (y > stair_height && x <= stair_length){
                Crafty.e('Wall').at(x,y);
                increment_stair_length = true;
            }
        }
        if(increment_stair_length && x >= stair_length){
            stair_length +=5 ;
            stair_height +=3 ;
        }
    }

    var player = Crafty.e('2D, object, Player, DOM, collision, twoway').attr({
        x: 50,
        y: 50
    }).gravity('Wall').twoway(7).gravityConst(1);
    player.bind('KeyDown', function(e){
        if(e.key == Crafty.keys.SPACE){
            bullet_x = this.x + 32;
            bullet_y = this.y + 30;
            if(this.facingRight){
                bullet_dir = 'e';
            }
            else{
                bullet_dir = 'w';
            }
            Crafty.e('bullet').attr({x: bullet_x, y: (this.y + 30), w: 10, h: 5, z: 50}).color("rgb(250,0,0)").bullet(bullet_dir);
        }
    })

});

Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
        .text('Loading....');
    Crafty.load(['/images/wall.jpg', '/images/transparent.png'], function(){
        Crafty.sprite(50, 50, '/images/wall.jpg', {wall: [1,0]});
        Crafty.sprite(68, 80, '/images/transparent.png', {
            happy_monkey: [0, 0],
            ready_monkey: [4, 0]
        });
        Crafty.scene('Game');
    })
});

