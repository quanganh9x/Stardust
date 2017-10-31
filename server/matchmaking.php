<?php

require "auth.php";
require "../config.php";
include "CoreUtils.php";
include "UserManager.php";
$db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
if ($db->connect_error) {
    die("Error ($db->connect_errno) "
        . $db->connect_error);
}
$manage = new CoreUtils();
$user = new UserManager();
class Matchmaking
{
    public $countdown = ($manage->totalUsers() / ($manage->onlineUsers() + $manage->matchmakingUsers() - $manage->playingUsers())) * 60;
    public function countdown() {
        return $countdown;
    }
    function matchmaking() {

    }
}