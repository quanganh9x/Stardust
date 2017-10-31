<?php
require "config.php";
session_start();
$db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
if ($db->connect_error) {
    die("Error ($db->connect_errno) "
        . $db->connect_error);
}
$username = $_SESSION['user'];
unset($_COOKIE['authStr']);
setcookie("authStr", '', time() - 3600);
$db->query("UPDATE $username set lastEvent = 'logout' where user = '$username'");
$db->query("UPDATE $username set session = NULL where user = '$username'");
?>