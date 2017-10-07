var imgRender = (function() {
    var images = {
        tankup: null,
        tankdown: null,
        tankleft: null,
        tankright: null,

        bulletup: null,
        bulletdown: null,
        bulletleft: null,
        bulletright: null,

        brick: null,
        steel: null
    };

    var imagesCount = images.length;
    var imagesLoaded = 0;

    for (var i in images) {
        var img = new Image();
        img.src = i+".png";
        img.onload = function() { ++imagesLoaded; };
        images[i] = img;
    }

    return {
        getImage: function (event,type) {
            name = type + event;
            return images[name];
        },
        getLoadingProgress: function () {
            return Math.floor((imagesLoaded / imagesCount) * 100);
        }
    };
})();