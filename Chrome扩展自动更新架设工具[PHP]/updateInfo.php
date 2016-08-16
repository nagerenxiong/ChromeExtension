<?php
    require('indent.php');

    function format($str) {
        return trim($str);
    }

    $info = array(
        'name' => strtolower(format($_POST['ext_name'])),
        'version' => format($_POST['ext_ver']),
        'file_url' => format($_POST['ext_url']),
        'id' => format($_POST['ext_id']),
        'passwd' => ($_POST['passwordA'])
    );


    $password = 'dd166c0fdeb318b3a78f79c53cfa588c';
    $salt = md5('close');

    if ($password === md5($info['passwd'] . $salt)) {
        $file = fopen('crx_info.json', 'r+');
        $JSON = json_decode(fread($file, filesize('crx_info.json')));
        fclose($file);
        (object)$JSON->{$info['name']};
        $JSON->{$info['name']}->version = $info['version'];
        $JSON->{$info['name']}->file_url = $info['file_url'];
        $JSON->{$info['name']}->id = $info['id'];
        $file = fopen('crx_info.json', 'w');
        fwrite($file, str_replace('\\/', '/', indent(json_encode($JSON))));
        fclose($file);
        header('Content-type: text/html');
        echo '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>';
        echo '<style type="text/css">[style*="fdead0"]{display:none}</style>';
        echo '<h1>扩展信息库更新成功！</h1>';
        echo '<pre>';
        echo str_replace('\\/', '/', indent(json_encode($JSON)));
        echo '</pre></body></html>';
    } else {
        echo 'Access Denied!';
    }
?>
