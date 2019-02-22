<?php
$dsn = 'mysql:host=localhost;dbname=echarts;';
$user = 'root';
$passworld = '123456';

$dbh = new  PDO($dsn,$user,$passworld);
$dbh ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
