<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Upload CRX</title>
    </head>
    <body>
    <?php
        $hash = 'dd166c0fdeb318b3a78f79c53cfa588c';
        $salt = md5('close');
        if ($hash !== md5($_POST['passwordB'] . $salt)) {
            echo '<h1>失败：密码错误！</h1>';
            exit;
        } else if ($_FILES['file']['error'] > 0) {
            echo '<h1>错误：' . error_get_last() . '</h1>';
            exit;
        } else if ($_FILES['file']['size'] > 2097152) {
            echo '<h1>失败：上传的文件大小不能超过2Mb！</h1>';
            exit;
        } else if ($_FILES['file']['type'] !== 'application/x-chrome-extension')
        {
            echo '<h1>失败：只能上传crx文件！</h1>';
            exit;
        }
        if (file_exists('crx/' . $_FILES['file']['name'])) {
            echo '<h1>旧文件更新成功！</h1>';
        } else {
            echo '<h1>新文件上传成功！</h1>';
        }
        move_uploaded_file($_FILES['file']['tmp_name'], 'crx/' . $_FILES['file']['name']);
        echo '<div>';
        echo '<ul>';
        echo '<li>文件名称：' . $_FILES['file']['name'] . '</li>';
        echo '<li>文件大小：' . $_FILES['file']['size']/1024 . 'Kb</li>';
        echo '<li>下载地址：' . $_SERVER['HTTP_ORIGIN'] . dirname($_SERVER['SCRIPT_NAME']) . '/crx/' . $_FILES['file']['name'] . '</li>';
        echo '</ul>';
        echo '</div>';
    ?>
    </body>
</html>
