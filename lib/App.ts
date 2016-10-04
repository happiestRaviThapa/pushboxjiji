/**
 * Created by Ravishankar.p.thapa on 10/3/2016.
 */
/// <reference path="phaser.d.ts"/>
const GAME_WIDTH: int = 600;
const GAME_HEIGHT: int = 450;


class TypeTesting{
    constructor() {
        console.log('*********** constructor *************');
        this.game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Phaser.Game;
    //game objects
    bgGreen: Phaser.Sprite;
    jiji: Phaser.Sprite;
    bullDozer: Phaser.Sprite;
    sprite: Phaser.Sprite;
    boxGrp1: Array<Phaser.Graphics>;
    boxGrp2: Array<Phaser.Graphics>;

    boxList: Array<Phaser.Graphics>;
    isClicked: Boolean;
    group : Phaser.Group;
    elevator: Phaser.Graphics;
    blockOne: int;
    blockTwo: int;
    selectedNum: int;
    nextLevel : Boolean = false;

    preload() {
        this.game.load.image('bgGreen', 'assets/bg_green.png');
        this.game.load.image('jiji', 'assets/SideViewFlatFooted0001.png');
        this.game.load.image('bullDozer', 'assets/BullDozer.png');
        this.game.load.image('platform', 'assets/Platform0001.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('jijiFrontView', 'assets/FrontView.png');
    }

    create() {
        this.isClicked = false;
        this.boxList = [];
        this.boxGrp1 = [];
        this.boxGrp2 = [];

        this.game.stage.backgroundColor = "#71c5cf";

        this.jiji = this.game.add.sprite(0, 0, 'jiji');
        this.jiji.scale.setTo(0.1, 0.1);

        this.bullDozer = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bullDozer');
        this.bullDozer.scale.setTo(0.4, 0.4);

        this.bullDozer.x = 0;
        this.bullDozer.y = (450 - 100) - this.bullDozer.height;

        var ground = this.game.add.graphics(0, 0);
        ground.beginFill(0x31c421,1);
        ground.drawRect(0,350, this.game.width, 100);
        ground.endFill();

        var barGrapbhic = this.game.add.graphics(0, 0);
        barGrapbhic.beginFill(0xb34a00,1);
        barGrapbhic.drawRect(0,0, 100, 10);
        barGrapbhic.endFill();
        barGrapbhic.x = 525;
        barGrapbhic.y = 350;

        var boxHeight = 25;
        var maxBlock = Math.floor( Math.random() * 8 ) + 2;
        this.blockOne = Math.floor( Math.random() * (maxBlock-1)) + 1;
        this.blockTwo = maxBlock - this.blockOne;

        for (var i = 0; i < this.blockOne; i++) {
            var graphicsLess = this.game.add.graphics(0, 0);
            makeBoxes(graphicsLess, 0 , 0, i, 0x1b60d1);
            graphicsLess.x = this.bullDozer.x + this.bullDozer.width;
            graphicsLess.y = ((450 - 100) - boxHeight * (i + 1));
            this.boxGrp1.push(graphicsLess);
        }

        this.jiji.x = this.bullDozer.x + this.bullDozer.width - 15;
        this.jiji.y = (450 - 100) - (this.jiji.height + (25 * this.blockOne)) + 10;

        for (var i = 0; i < this.blockTwo; i++) {
            var graphicsLess = this.game.add.graphics(0, 0);
            makeBoxes(graphicsLess, 0 , 0, i, 0x1b60d1);
            graphicsLess.x = 280;
            graphicsLess.y = ((450 - 100) - boxHeight * (i + 1));
            this.boxGrp2.push(graphicsLess);
        }

        var line = this.blockTwo * 25;
        this.elevator = this.game.add.graphics(0, 0);
        this.elevator.beginFill(0x000000,1);
        this.elevator.drawRect(0,0, Math.sqrt(line*line + line*line), 2);
        this.elevator.endFill();
        this.elevator.x = 280;
        this.elevator.y = (350 - (this.blockTwo * 25));
        this.elevator.angle = 135;

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

            graphics.events.onInputDown.add(function(item) {
                this.isClicked = true;
                this.selectedNum = item.name + 1;
                for (var i = 0; i < 10; i++) {
                    this.boxList[i].events.onInputOver.removeAll(this);
                    this.boxList[i].events.onInputOut.removeAll(this);
                    if(i > item.name) {
                        this.boxList[i].alpha = 0.2;
                    }
                }
            }, this);

            makeBoxes(graphics, x , y, i, 0xffffff);
            this.boxList.push(graphics);
        }
    }

    update() {
        if(this.isClicked == true) {
            this.bullDozer.x += 2;
            this.jiji.x += 2;
            for(var i=0; i<this.boxGrp1.length; i++){
                this.boxGrp1[i].x += 2;
            }

            if(this.bullDozer.x + this.bullDozer.width >= 280 - this.elevator.width && this.bullDozer.x + this.bullDozer.width <= 280){
                for(var i=0; i<this.boxGrp1.length; i++){
                    this.boxGrp1[i].y -= 1.5;
                }
                this.jiji.y -= 1.5;
            }

            if (this.jiji.x > 280) {
                this.elevator.alpha = 0;
            }

            if(this.bullDozer.x + this.bullDozer.width >= 280) {
                for(var i=0; i<this.boxGrp1.length; i++){
                    this.boxGrp1[i].y = ((450 - 100) - 25 * (i + this.blockTwo + 1));
                }
                for(i=0; i < this.boxGrp2.length; i++){
                    this.boxGrp2[i].x += 2;
                }
                this.jiji.y = (450 - 100) - (this.jiji.height + (25 * (this.blockOne + this.blockTwo))) + 10;

                if (this.bullDozer.x + this.bullDozer.width >= 498) {
                    this.isClicked = false;
                    if(this.blockOne + this.blockTwo == this.selectedNum) {
                        console.log("Yay! you are hero.");
                        this.nextLevel = true;
                    }
                    else {
                        console.log("Go back to school dude :D");
                        this.jiji = this.game.add.sprite(this.jiji.x, this.jiji.y, 'jijiFrontView');
                        this.jiji.scale.setTo(0.1, 0.1);
                    }
                }
            }
        }
        else if (this.nextLevel) {
            this.jiji.x += 2;
        }
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