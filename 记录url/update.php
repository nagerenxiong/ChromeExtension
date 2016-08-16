<?php
$mysql = new SaeMysql();
$url =$_REQUEST['url'];
$title =$_REQUEST['title'] ;
$sql = "UPDATE url SET title='".$title."' WHERE url='".$url."'";
$mysql->runSql( $sql );
if( $mysql->errno() != 0 )
{
    die( "Error:" . $mysql->errmsg() );
}
$mysql->closeDb();
?>