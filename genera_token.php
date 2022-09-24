<?php
session_start();
$_SESSION['token'] = md5(uniqid(mt_rand(),true));
echo json_encode(["token" => $_SESSION['token']]);
?>