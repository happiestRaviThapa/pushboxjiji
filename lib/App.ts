/**
 * Created by Ravishankar.p.thapa on 10/3/2016.
 */

class TypeTesting{
    constructor() {
        console.log('*********** constructor *************');
        this.game = new Phaser.Game(600, 450, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Phaser.Game;
    //game objects
    bgGreen: Phaser.Sprite;
    jiji: Phaser.Sprite;
    bullDozer: Phaser.Sprite;
    elevator: Phaser.Sprite;
    sprite: Phaser.Sprite;
    pipes: Phaser.Group;
    allSprites: Array<Phaser.Sprite>;

    boxList: Array<Phaser.Graphics>;
    ///boxHeight = 25 ;

    preload() {
        this.game.load.image('bgGreen', 'assets/bg_green.png');
        this.game.load.image('jiji', 'assets/SideViewFlatFooted0001.png');
        this.game.load.image('bullDozer', 'assets/BullDozer.png');
        this.game.load.image('elevator', 'assets/Elevator.png');
        this.game.load.image('platform', 'assets/Platform0001.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    }

    create() {
        this.boxList = [];
        this.game.stage.backgroundColor = "#71c5cf";

        ///this.bgGreen = this.game.add.sprite(0, 350, 'bgGreen');

        this.jiji = this.game.add.sprite(0, 0, 'jiji');
        this.jiji.scale.setTo(0.1, 0.1);

        this.bullDozer = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bullDozer');
        this.bullDozer.scale.setTo(0.4, 0.4);

        this.elevator = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'elevator');
        this.elevator.scale.setTo(0.1, 0.1);
        this.elevator.angle = 35;
        this.elevator.x = 280 - this.elevator.width +2;
        this.elevator.y = (450 - 100) - this.elevator.height + 15;

        this.bullDozer.x = 0;
        this.bullDozer.y = (450 - 100) - this.bullDozer.height;

        var bgGraphic = this.game.add.graphics(0, 0);
        bgGraphic.beginFill(0x31c421,1);
        bgGraphic.drawRect(0,350, this.game.width, 100);
        bgGraphic.endFill();

        var barGrapbhic = this.game.add.graphics(0, 0);
        barGrapbhic.beginFill(0xb34a00,1);
        barGrapbhic.drawRect(0,0, 100, 10);
        barGrapbhic.endFill();
        barGrapbhic.x = 525;
        barGrapbhic.y = 350;

        var boxHeight = 25;
        var maxBlock = Math.floor( Math.random() * 8 ) + 2;
        var blockOne = Math.floor( Math.random() * maxBlock );
        var blockTwo = maxBlock - blockOne;

        console.log(maxBlock +'  <<maxBlock');
        console.log(blockOne +'  <<blockOne');
        console.log(blockTwo +'  <<blockTwo');
        for (var i = 0; i < blockOne; i++) {
            var x = this.bullDozer.x + this.bullDozer.width;;
            var y = ((450 - 100) - boxHeight * (i + 1));
            var graphicsLess = this.game.add.graphics(0, 0);
            makeBoxes(graphicsLess, x , y, i, 0x1b60d1);
        }

        this.jiji.x = this.bullDozer.x + this.bullDozer.width - 15;
        this.jiji.y = (450 - 100) - (this.jiji.height + (25 * blockOne)) + 10;

        for (var i = 0; i < blockTwo; i++) {
            var x = 280;
            var y = ((450 - 100) - boxHeight * (i + 1));
            var graphicsLess = this.game.add.graphics(0, 0);
            makeBoxes(graphicsLess, x , y, i, 0x1b60d1);
        }

        for (var i = 0; i < 10; i++) {
            var x = 500;
            var y = ((450 - 100) - boxHeight * (i + 1));
            var graphics = this.game.add.graphics(0, 0);
            graphics.inputEnabled = true;
            graphics.events.onInputOver.add(function(item){
                for(var i=0; i<this.boxList.length; i++){
                    this.boxList[i].tint = 0xFF700B;
                    if(item.name ===  this.boxList[i].name){
                        barGrapbhic.x = 500 + boxHeight;
                        barGrapbhic.y = ((450 - 100) - boxHeight * (i + 1));
                        break;
                    }
                }

            }, this);

            graphics.events.onInputOut.add(function(item){
                for(var i=0; i<this.boxList.length; i++){
                    this.boxList[i].tint = 0xffffff;
                }
                barGrapbhic.x = 525;
                barGrapbhic.y = 350;

            }, this);

            makeBoxes(graphics, x , y, i, 0xffffff);
            this.boxList.push(graphics);
        }
    }

    update() {
        //this.bullDozer.x += 2;
        //this.jiji.x += 2;
    }

    overfunc = function(item) {
        console.log("over  "+item.x);
        for(var i=0; i<this.boxList.length; i++){
            console.log(this.boxList[i].name+  "   list name");
        }
        item.tint = 0xFF700B;
    }

    outfunc = function(item) {
        console.log("out  "+item.x);
        item.tint = 0xffffff;

    }






}

function makeBoxes(obj, x, y, name, color){
    obj.name = name;
    obj.lineStyle(1, 0x000000, 1);
    obj.beginFill(color,1);
    obj.drawRect(x,y, 25, 25);
    obj.endFill();
    return obj;
}


window.onload = () => {
    var test = new TypeTesting();
};