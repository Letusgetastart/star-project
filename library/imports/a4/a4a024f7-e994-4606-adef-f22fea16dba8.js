"use strict";
cc._RF.push(module, 'a4a02T36ZRGBq3v8i/qFtuo', 'Player');
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //主角跳跃高度
        jumpHeight: 0,
        //主角跳跃的持续时间
        jumpDuration: 0,
        //最大移动速度
        maxMoveSpeed: 0,
        //加速度
        accel: 0,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
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
    setJumpAction: function setJumpAction() {
        //跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        var callback = cc.callFunc(this.playJumpSound, this);
        //不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },
    playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.acceLeft = true;
                break;
            case cc.macro.KEY.right:
                this.acceRight = true;
                break;
            case cc.macro.KEY.a:
                this.acceLeft = true;
                break;
            case cc.macro.KEY.d:
                this.acceRight = true;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.acceLeft = false;
                break;
            case cc.macro.KEY.d:
                this.acceRight = false;
                break;
            case cc.macro.KEY.left:
                this.acceLeft = false;
                break;
            case cc.macro.KEY.right:
                this.acceRight = false;
                break;
        }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.acceLeft = false;
        this.acceRight = false;

        // 主角当前水平方向速度
        this.Xspeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    update: function update(dt) {

        //限制主角不跑出屏幕
        if (this.node.x + this.node.width / 2 > 480) {
            this.acceRight = false;
        }
        if (this.node.x - this.node.width / 2 < -480) {
            this.acceLeft = false;
        }

        // 根据当前加速度方向每帧更新速度
        if (this.acceLeft) {
            if (this.Xspeed > 0) {
                this.Xspeed = 0;
            }
            this.Xspeed -= this.accel * dt;
        } else if (this.acceRight) {
            if (this.Xspeed < 0) {
                this.Xspeed = 0;
            }
            this.Xspeed += this.accel * dt;
        } else {
            this.Xspeed = 0;
        }

        // 限制主角的速度不能超过最大值
        if (Math.abs(this.Xspeed) > this.maxMoveSpeed) {
            this.Xspeed = this.maxMoveSpeed * this.Xspeed / Math.abs(this.Xspeed);
        }

        this.node.x += this.Xspeed * dt;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();