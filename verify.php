<?php
session_start();
if(!isset($_SESSION["userlogin"]) && isset($_COOKIE)){
    header("Location: login.php");
    exit(); }
?>