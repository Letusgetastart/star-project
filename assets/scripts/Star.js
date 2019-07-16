// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius:0,
        game:{
            default:null,
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    getPlayerDistance(){
        var playerPos=this.game.player.getPosition();

        var dist=this.node.position.sub(playerPos).mag();

        return dist;
    },

    onPick(){
        this.game.spawnNewStar();

        this.game.gainScore();
        
        this.node.destroy();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var opacityRatio=1-this.game.timer/this.game.starDuration;
        var minOpacity=50;
        this.node.opacity=minOpacity+Math.floor(opacityRatio*(255-minOpacity));

        if(this.getPlayerDistance()<this.pickRadius){
            this.onPick();
            return;
        }
    },
});
