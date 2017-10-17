function cacheCanvas() {
}

cacheCanvas.prototype.init = function () {
    this._cacheCanvas = document.createElement("canvas");
    this._cacheCanvas.width = define.unit*16;
    this._cacheCanvas.height = define.unit*14;
    this.ctx = this._cacheCanvas.getContext("2d");
    this.draw();
};
cacheCanvas.prototype.renderedCanvas = function() {
    return this._cacheCanvas;
};

cacheCanvas.prototype.draw = function() {
    var rendered = new mapRender();
    rendered.getMap(1);
    rendered.draw(this.ctx);
};