<?php
include "verify.php";
require "config.php";
session_start();
// session isnt reliable

function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if (isset($_POST['userlogin']) && isset($_POST['passlogin']) && $_POST['logintype'] == "login") {
    $db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
    if ($db->connect_error) {
        die("Error ($db->connect_errno) "
            . $db->connect_error);
    }
    $username = $db->real_escape_string($_POST['userlogin']);
    $password = stripslashes($_POST['passlogin']);
    $event = $db->real_escape_string($_POST['logintype']);
    $result = $db->query("SELECT user, pass from quanganh9x where user = '$username' and pass = '".md5($password)."'")->num_rows;
    if ($result == 1) {
        $sessionId = generateRandomString(30);
        $authStr = $username."hahahihihihi".$sessionId;
        $db->query("UPDATE $username set lastEvent = '$event' where user = '$username'");
        $db->query("UPDATE $username set session = '$sessionId' where user = '$username'");
        setcookie("authStr" , base64_encode($authStr), time()+3600*12 ,"/");
        $_SESSION['user'] = $username;
        echo "<script>alert(1);</script>";
    } else {
        echo "<script>alert('Login failed! User isnt existing in database or wrong password');</script>";
        header("Location: login.php");
    }
}
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8"/>
    <style>

    </style>
</head>
<body>
<form method="post" action="login.php">
    <input type="text" placeholder="Username" name="userlogin">
    <input type="password" placeholder="Password" name="passlogin">
    <input type="hidden" value="login" name="logintype">
    <input type="submit" value="Login">
</form>
</body>
</html>
