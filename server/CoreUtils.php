<?php
/**
 * Created by IntelliJ IDEA.
 * User: quanganh9x
 * Date: 31/10/2017
 * Time: 18:14
 */
require "../config.php";

class CoreUtils
{
    private const $db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
    public function totalUsers() {
        $count = $db->query("SELECT user from quanganh9x")->num_rows;
        return $count;
    }
    public function onlineUsers() {
        $count = $db->query("SELECT user from quanganh9x where lastEvent = 'login'")->num_rows;
        return $count;
    }
    public function matchmakingUsers() {
        $count = $db->query("SELECT user from quanganh9x where lastEvent = 'matchmaking'")->num_rows;
        return $count;
    }
}