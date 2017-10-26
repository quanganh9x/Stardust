<?php
require_once "config.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tank 1990 - Reborn!</title>
    <style>
        body {
            text-align: center;
            margin: 0;
            padding: 0;
            height: 100%;
        }
        canvas {
            border: 2px solid black;
            background-color: black;
        }
        footer {
            text-align: center;
            padding: 10px;
            background-color: bisque;
        }
        .overlay {
            position: fixed;
            width: 100%;
            height: 999px;
            left: 0;
            top: 0;
            background-color: black;
            z-index: 10;
        }
    </style>
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    <!-- <link rel="prefetch" href="image.png"> -->
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js"></script>
    <script src="js/firebaseHandler.js"></script>
    <script>
        var config = {
            apiKey: "AIzaSyAN_4NrplOO6g5VqzQI535ACfupwgs8maA",
            authDomain: "quanganh9x-tank-worlds.firebaseapp.com",
            databaseURL: "https://quanganh9x-tank-worlds.firebaseio.com",
            projectId: "quanganh9x-tank-worlds",
            storageBucket: "",
            messagingSenderId: "428762755077"
        };
        firebase.initializeApp(config);
        var firebaseData = firebase.database();
        var firebasePort = new firebaseHandler(firebaseData);
    </script>
    <script src="js/sceneManager.js"></script>
    <script src="apis/SmoothMovement.js"></script>
    <script src="apis/rAFSupport.js"></script>
    <script src="js/Bullet.js"></script>
    <script src="js/cacheCanvas.js"></script>
    <script src="js/coreComponents.js"></script>
    <script src="js/gameStatus.js"></script>
    <script src="js/globalVariables.js"></script>
    <script src="js/imgRender.js"></script>
    <script src="js/Players.js"></script>
    <script src="js/mapRender.js"></script>
    <script src="js/Tank.js"></script>
    <!-- <script src="js/hahaIwanttoPlay.js"></script> -->
    <script>
        var myGameArea = new sceneManager();
        var cache = new cacheCanvas();
        var rendered = new mapRender();
        rendered.getMap(1);
        var check = false;
        document.addEventListener("DOMContentLoaded", function(event) {
            var cookieStr = document.cookie;
            if (cookieStr == "Y2FjaGVkPTE=") check = true;
            if (!check) {
                cache.init();
                myGameArea.init();
                myGameArea.loop();
            } /*else {
                myGameArea.welcome();
                setTimeout(function () {
                    location.reload();
                },10000);
            }*/
        });
    </script>
</head>
<body onload="fucked()"><div id="beepbloop">
<!-- <audio autoplay="autoplay">
    <source src="sound/yayyyyyyyy.mp3" />
</audio> -->
<div style="text-align:center; width:320px;">
    <p>You are in: <span id="mode">Offline</span> mode</p>
    <input type="text" id="user1" placeholder="Player 01"/>
    <input type="text" id="user2" placeholder="Player 02"/>
    <button onclick="firebasePort.getUser()">Get ?</button>
</div>
<footer>Copyright &copy; 2017 quanganh9x</footer>
</div>
</body>
</html>