function mapRender() {
    this._construct = {
        brick: [],
        steel: [],
        base: [],
        curtain: []
    };
}

mapRender.prototype.getMap = function (mapid) {
    switch (mapid) {
        case 1:
            this._construct.brick.push({x:208,y:416},{x:208,y:400},{x:208,y:384},{x:224,y:384},{x:240,y:384},{x:256,y:384},{x:256,y:400},{x:256,y:416},{x:64,y:368},{x:80,y:368},{x:64,y:384},{x:80,y:384},{x:64,y:336},{x:80,y:336},{x:64,y:352},{x:80,y:352},{x:64,y:304},{x:80,y:304},{x:64,y:320},{x:80,y:320},{x:128,y:304},{x:144,y:304},{x:128,y:320},{x:144,y:320},{x:128,y:336},{x:144,y:336},{x:128,y:352},{x:144,y:352},{x:128,y:368},{x:144,y:368},{x:128,y:384},{x:144,y:384},{x:192,y:304},{x:208,y:304},{x:192,y:320},{x:208,y:320},{x:192,y:272},{x:208,y:272},{x:192,y:288},{x:208,y:288},{x:224,y:272},{x:240,y:272},{x:224,y:288},{x:240,y:288},{x:256,y:272},{x:272,y:272},{x:256,y:288},{x:272,y:288},{x:256,y:304},{x:272,y:304},{x:256,y:320},{x:272,y:320},{x:320,y:368},{x:336,y:368},{x:320,y:384},{x:336,y:384},{x:320,y:336},{x:336,y:336},{x:320,y:352},{x:336,y:352},{x:320,y:304},{x:336,y:304},{x:320,y:320},{x:336,y:320},{x:384,y:304},{x:400,y:304},{x:384,y:320},{x:400,y:320},{x:384,y:336},{x:400,y:336},{x:384,y:352},{x:400,y:352},{x:384,y:368},{x:400,y:368},{x:384,y:384},{x:400,y:384},{x:192,y:336},{x:208,y:336},{x:256,y:336},{x:272,y:336},{x:128,y:288},{x:144,y:288},{x:64,y:288},{x:80,y:288},{x:320,y:288},{x:336,y:288},{x:384,y:288},{x:400,y:288},{x:256,y:256},{x:272,y:256},{x:192,y:256},{x:208,y:256},{x:352,y:240},{x:368,y:240},{x:320,y:240},{x:336,y:240},{x:96,y:240},{x:112,y:240},{x:128,y:240},{x:144,y:240},{x:32,y:224},{x:48,y:224},{x:96,y:224},{x:112,y:224},{x:128,y:224},{x:144,y:224},{x:320,y:224},{x:336,y:224},{x:352,y:224},{x:368,y:224},{x:416,y:224},{x:432,y:224},{x:192,y:208},{x:208,y:208},{x:256,y:208},{x:272,y:208},{x:256,y:192},{x:272,y:192},{x:192,y:192},{x:208,y:192},{x:128,y:176},{x:144,y:176},{x:64,y:176},{x:80,y:176},{x:320,y:176},{x:336,y:176},{x:384,y:176},{x:400,y:176},{x:256,y:144},{x:272,y:144},{x:192,y:144},{x:208,y:144},{x:128,y:144},{x:144,y:144},{x:128,y:160},{x:144,y:160},{x:64,y:144},{x:80,y:144},{x:64,y:160},{x:80,y:160},{x:64,y:112},{x:80,y:112},{x:64,y:128},{x:80,y:128},{x:64,y:80},{x:80,y:80},{x:64,y:96},{x:80,y:96},{x:64,y:48},{x:80,y:48},{x:64,y:64},{x:80,y:64},{x:128,y:48},{x:144,y:48},{x:128,y:64},{x:144,y:64},{x:128,y:80},{x:144,y:80},{x:128,y:96},{x:144,y:96},{x:128,y:112},{x:144,y:112},{x:128,y:128},{x:144,y:128},{x:192,y:112},{x:208,y:112},{x:192,y:128},{x:208,y:128},{x:192,y:80},{x:208,y:80},{x:192,y:96},{x:208,y:96},{x:192,y:48},{x:208,y:48},{x:192,y:64},{x:208,y:64},{x:256,y:48},{x:272,y:48},{x:256,y:64},{x:272,y:64},{x:256,y:80},{x:272,y:80},{x:256,y:96},{x:272,y:96},{x:256,y:112},{x:272,y:112},{x:256,y:128},{x:272,y:128},{x:320,y:144},{x:336,y:144},{x:320,y:160},{x:336,y:160},{x:320,y:112},{x:336,y:112},{x:320,y:128},{x:336,y:128},{x:320,y:80},{x:336,y:80},{x:320,y:96},{x:336,y:96},{x:320,y:48},{x:336,y:48},{x:320,y:64},{x:336,y:64},{x:384,y:48},{x:400,y:48},{x:384,y:64},{x:400,y:64},{x:384,y:80},{x:400,y:80},{x:384,y:96},{x:400,y:96},{x:384,y:112},{x:400,y:112},{x:384,y:128},{x:400,y:128},{x:384,y:144},{x:400,y:144},{x:384,y:160},{x:400,y:160});
            this._construct.steel.push({x:32,y:240},{x:48,y:240},{x:416,y:240},{x:432,y:240},{x:224,y:112},{x:240,y:112},{x:224,y:128},{x:240,y:128});
            this._construct.base.push({x:224,y:400});
            this._construct.curtain.push({x: 0, y: 0, m: 32*16, n: 16}, {x: 0, y: 0, m: 32, n: 32*14}, {x: 0, y: 32*13.5, m: 32*16, n: 16},{x: 32*14, y: 0, m: 32*3, n: 32*14});
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
};

mapRender.prototype.sorting = function (arr) {
    return arr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
};
mapRender.prototype.getBlocks = function () {
    var blocks = [];
    for (i=0;i<this._construct.brick.length;i++) blocks.push({u: this._construct.brick[i].y, d: this._construct.brick[i].y + define._sizeblock, l: this._construct.brick[i].x, r: this._construct.brick[i].x + define._sizeblock});
    for (i=0;i<this._construct.steel.length;i++) blocks.push({u: this._construct.steel[i].y, d: this._construct.steel[i].y + define._sizeblock, l: this._construct.steel[i].x, r: this._construct.steel[i].x + define._sizeblock});
    return blocks;
};

mapRender.prototype.defineBlocks = function (arrBlock) {
    var blocks = [];
    for (i=0;i<arrBlock.length;i++) {
        blocks[i] = true;
    }
    return blocks;

}

mapRender.prototype.draw = function (ctx) {
    for (i=0;i<this._construct.brick.length;i += 1) ctx.drawImage(imgRender.getImage("", "brick"), this._construct.brick[i].x, this._construct.brick[i].y, define._sizeblock, define._sizeblock);
    for (i=0;i<this._construct.steel.length;i += 1) ctx.drawImage(imgRender.getImage("", "steel"), this._construct.steel[i].x, this._construct.steel[i].y, define._sizeblock, define._sizeblock);
    for (i=0;i<this._construct.base.length;i+= 1) ctx.drawImage(imgRender.getImage("", "base"), this._construct.base[i].x, this._construct.base[i].y, define._sizetank, define._sizetank);
    for (i = 0; i < this._construct.curtain.length; i += 1) {
        ctx.fillStyle = "#808080";
        ctx.fillRect(this._construct.curtain[i].x, this._construct.curtain[i].y, this._construct.curtain[i].m, this._construct.curtain[i].n);
    }
};
