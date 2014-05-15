Crafty.scene('Game', function(){
    //Crafty.e('Player').at(5,5);
    var player = Crafty.e('2D, object, Player1, Tweener').attr({
        x: 10,
        y: 0
    }).addTween({ 
        y: 200
    }, 'easeOutBounce', 200);
    this.bind('EnterFrame', function(frameInfo){
    });
});

Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
        .text('Loading....');
    Crafty.load(['/images/monkeysprites.png'], function(){
        Crafty.sprite(68, 80, '/images/monkeysprites.png', {
            happy_monkey: [0, 0],
            ready_monkey: [4, 0]
        });
        Crafty.scene('Game');
    })
});

