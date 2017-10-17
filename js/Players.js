function Players() {

}

Players.prototype.shotBullet = function () {
        if (!hasAlreadyShot) {
            hasAlreadyShot = true;
            setTimeout(function () {
                hasAlreadyShot = false;
            },1000);
            var bullx, bully;
            recordDirectionOfBullet = eventLog;
            switch (recordDirectionOfBullet) {
                case "up":
                    bullx = this.x + 10;
                    bully = this.y - 10;
                    break;
                case "down":
                    bullx = this.x + 10;
                    bully = this.y + 10;
                    break;
                case "left":
                    bullx = this.x - 20;
                    bully = this.y + 10;
                    break;
                case "right":
                    bullx = this.x + 30;
                    bully = this.y + 10;
                    break;
            }
            myBullet[0] = new component(_sizebullet, _sizebullet, "", bullx, bully, "bullet");
            if (lineStatus == 1) {
                writeData("bullet", userId, this.x, this.y);
                writeShotStatus(true);
            }
        }
};