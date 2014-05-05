Crafty.scene('Game', function(){
    Crafty.e('Player').at(5,5);
});

Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
        .text('Loading....');
    Crafty.load(['assets/monkeysprites.png'], function(){
        Crafty.sprite(68, 80, 'assets/monkeysprites.png', {
            happy_monkey: [0, 0],
            ready_monkey: [4, 0]
        });
        Crafty.scene('Game');
    })
});

