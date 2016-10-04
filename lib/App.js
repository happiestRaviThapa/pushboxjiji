/**
 * Created by Ravishankar.p.thapa on 10/3/2016.
 */
var TypeTesting = (function () {
    function TypeTesting() {
        console.log('*********** constructor *************');
        this.game = new Phaser.Game(600, 450, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    TypeTesting.prototype.preload = function () {
        this.game.load.image('bgGreen', 'assets/bg_green.png');
        this.game.load.image('jiji', 'assets/SideViewFlatFooted0001.png');
        this.game.load.image('bullDozer', 'assets/BullDozer.png');
        this.game.load.image('elevator', 'assets/Elevator.png');
        this.game.load.image('platform', 'assets/Platform0001.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    };
    TypeTesting.prototype.create = function () {
        this.game.stage.backgroundColor = "#71c5cf";
        this.bgGreen = this.game.add.sprite(0, 350, 'bgGreen');
        this.jiji = this.game.add.sprite(0, 0, 'jiji');
        this.jiji.scale.setTo(0.1, 0.1);
        this.bullDozer = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bullDozer');
        this.bullDozer.scale.setTo(0.4, 0.4);
        this.elevator = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'elevator');
        this.elevator.scale.setTo(0.1, 0.1);
        this.elevator.angle = 35;
        this.elevator.x = 280 - this.elevator.width + 2;
        this.elevator.y = (450 - 100) - this.elevator.height + 15;
        this.bullDozer.x = 0;
        this.bullDozer.y = (450 - 100) - this.bullDozer.height;
        for (var i = 0; i < 5; i++) {
            var sprite = this.game.add.sprite(0, 0, 'pipe');
            sprite.scale.setTo(0.5, 0.5);
            sprite.x = this.bullDozer.x + this.bullDozer.width;
            sprite.y = ((450 - 100) - sprite.height * (i + 1));
        }
        this.jiji.x = this.bullDozer.x + this.bullDozer.width - 15;
        this.jiji.y = (450 - 100) - (this.jiji.height + (25 * 5)) + 10;
        for (var i = 0; i < 3; i++) {
            var sprite = this.game.add.sprite(0, 0, 'pipe');
            sprite.scale.setTo(0.5, 0.5);
            sprite.x = 280;
            sprite.y = ((450 - 100) - sprite.height * (i + 1));
        }
        for (var i = 0; i < 10; i++) {
            var sprite = this.game.add.sprite(0, 0, 'pipe');
            sprite.inputEnabled = true;
            sprite.scale.setTo(0.5, 0.5);
            sprite.x = 400;
            sprite.y = ((450 - 100) - sprite.height * (i + 1));
            sprite.events.onInputOver.add(over, this);
            sprite.events.onInputOut.add(out, this);
        }
        console.log("init complete  ***");
    };
    TypeTesting.prototype.update = function () {
        //this.bullDozer.x += 2;
        //this.jiji.x += 2;
    };
    return TypeTesting;
}());
function over(item) {
    console.log("over");
    item.alpha = 0.5;
}
function out(item) {
    console.log("out");
    item.alpha = 1;
}
window.onload = function () {
    var test = new TypeTesting();
};
