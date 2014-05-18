Crafty.scene('Game', function(){
    //Crafty.e('Player').at(5,5);
    /*var mouseTracker = Crafty.e("2D, Mouse").attr({w: Game.width(), h: Game.height(), x: 0, y: 0});
    mouseTracker.bind('MouseMove', function(e){
        player.x = Crafty.mousePos.x;
        player.y = Crafty.mousePos.y;
    });
    */
    this.bind('EnterFrame', function(){
        if(Crafty('Balloon').length < 5){
            Crafty.e('Balloon').attr({x: Crafty.math.randomNumber(Game.width()/2,Game.width()), y: (Game.height()*(3/4))});
        }
    });

    var stair_length = 5;
    var stair_height = (1/3)* Game.map_grid.height;
    for (var x = 0; x < Game.map_grid.width; x++) {
        var increment_stair_length = false;
        for (var y = 0; y < Game.map_grid.height; y++){
            var at_edge = x == 0 || x > Game.map_grid.width - 2  || y == 0 || y > Game.map_grid.height - 2;
            if (at_edge) {
                Crafty.e('Wall').at(x,y);
            }
            if ( !at_edge && y > stair_height && x <= stair_length){
                Crafty.e('Grass').at(x,y);
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
    }).gravity('Solid').twoway(7).gravityConst(1);
    player.bind('KeyDown', function(e){
        if(e.key == Crafty.keys.SPACE){
            bullet_x = this.x + 20;
            bullet_y = this.y + 20;
            if(this.facingRight){
                bullet_dir = 'e';
                this.animate('ShootRight', 1);
            }
            else{
                bullet_dir = 'w';
                this.animate('ShootLeft', 1);
            }
            Crafty.e('bullet').attr({x: bullet_x, y: bullet_y, z: 50}).bullet(bullet_dir);
        }
    })


});

Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
        .text('Loading....');
    Crafty.load(['/images/wall.jpg', '/images/transparent.png', '/images/fire.png', '/images/grass.jpg', '/images/balloon.png'], function(){
        Crafty.sprite(50, 50, '/images/wall.jpg', {wall: [1,0]});
        Crafty.sprite('/images/fire.png', {fire: [0,0, 50, 50]});
        Crafty.sprite('/images/grass.jpg', {grass: [0,0, 50, 50]});
        Crafty.sprite('/images/balloon.png', {balloon: [0,0, 30, 50]});
        Crafty.sprite(68, 78, '/images/transparent.png', {
            happy_monkey: [0, 0],
            ready_monkey: [4, 0]
        });
        Crafty.scene('Game');
    })
});

