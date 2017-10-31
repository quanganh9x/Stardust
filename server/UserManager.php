<?php
/**
 * Created by IntelliJ IDEA.
 * User: quanganh9x
 * Date: 31/10/2017
 * Time: 19:52
 */

class UserManager {
    private const $db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
    public function fetchRank() {
        return $db->query("SELECT rank from quanganh9x where user = '".$_SESSION['user']."'")->fetch_assoc();
    }
    public function fetchLv() {
        return $db->query("SELECT lv from quanganh9x where user = '".$_SESSION['user']."'")->fetch_assoc();
    }
}