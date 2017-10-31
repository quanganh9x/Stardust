<?php

require "config.php";
function preCheck($db, $username, $email) {
    $preCheck1 = $db->query("SELECT user from quanganh9x where user = '$username'")->num_rows;
    $preCheck2 = $db->query("SELECT email from quanganh9x where email = '$email'")->num_rows;
    if ($preCheck1 == 1 || $preCheck2 == 1) return false;
    return true;
}
if (isset($_POST['userreg']) && isset($_POST['passreg']) && isset($_POST['namereg']) && isset($_POST['emailreg']) && $_POST['logintype'] == "register") {
    $db = new mysqli($datahost, $datauser, $datapass, $dataname, $dataport);
    if ($db->connect_error) {
        die("Error ($db->connect_errno) "
            . $db->connect_error);
    }
    $username = $db->real_escape_string($_POST['userreg']);
    $password = stripslashes($_POST['passreg']);
    $fullname = $db->real_escape_string($_POST['namereg']);
    $email = stripslashes($_POST['emailreg']);
    if (preCheck($db, $username, $email)) {
        $db->query("insert into quanganh9x (user, pass, name, email, lastEvent, created_time) VALUES ('$username', '".md5($password)."', '$fullname', '$email', '".$_POST['logintype']."', '".time()."')");
        echo "OK";
    }
    else {
        echo "<script>alert('Register failed. Whether username or email exists in database');</script>";
        header("Location: register.php");
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
<form method="post" action="register.php">
    <input type="text" placeholder="Username" name="userreg">
    <input type="password" placeholder="Password" name="passreg">
    <input type="text" placeholder="Fullname" name="namereg">
    <input type="text" placeholder="Email" name="emailreg">
    <input type="hidden" value="register" name="logintype">
    <input type="submit" value="Register">
</form>
</body>
</html>
