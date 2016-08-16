<?php
    $str = $_POST['str'];
    $salt = md5($_POST['salt']);
    echo md5($str . $salt);
?>
