<?php
$mysql = new SaeMysql();
$url =$_REQUEST['url'];
$title =$_REQUEST['title'] ;
$sql = "INSERT INTO url(url,title,curretime) value ('".$url."','".$title."','".date('y-m-d h:i:s')."')";
$mysql->runSql( $sql );
if( $mysql->errno() != 0 )
{
    die( "Error:" . $mysql->errmsg() );
}
$mysql->closeDb();
?>