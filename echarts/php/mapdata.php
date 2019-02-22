<?php
$dsn = 'mysql:host=localhost;dbname=echarts;';
$user = 'root';
$passworld = '123456';

    $dbh = new  PDO($dsn,$user,$passworld);
    $dbh ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $result=$dbh->query('select * from echarts_map');
    //将查询出的数据输出
    while($row=$result->fetch()){
        $arr['name'][]=$row['province'];
        $arr['value'][]=$row['gdp'];
    }
    echo json_encode($arr); //输出json格式数据

?>