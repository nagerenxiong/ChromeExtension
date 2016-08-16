<?php
    $crx = $_GET['crx'];
    if ($crx !== '') {
    	$file = fopen('crx_info.json', 'r');
    	$JSON = json_decode(fread($file, filesize('crx_info.json')), true);
        fclose($file);
        $appid = $JSON[$crx]['id'];
        $codebase = $JSON[$crx]['file_url'];
        $version = $JSON[$crx]['version'];
        if (!$appid) {
            exit;
        }
        header('Content-type: text/xml');
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">' . "\n";
        echo "\t" . '<app appid="' . $appid . '">' . "\n";
        echo "\t\t" . '<updatecheck codebase="' . $codebase . '" version="' . $version . '" />' . "\n";
        echo "\t" . '</app>' . "\n";
        echo '</gupdate>' . "\n";
    } else {
    	exit;
    }
?>
