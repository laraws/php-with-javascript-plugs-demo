<?php
/**
 * Created by PhpStorm.
 * User: shaowen.wang
 * Date: 2018/1/30
 * Time: 15:30
 */

$dsn = 'mysql:host=localhost;dbname=echarts;';
$user = 'root';
$passworld = '123456';

$dbh = new  PDO($dsn,$user,$passworld);
$dbh ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

//获取股票name和其所有指数的数组
$result=$dbh->query('SELECT stock.stock_name,group_concat(price.price) as price, GROUP_CONCAT(price.time) as time FROM stock,price WHERE stock.stock_id=price.stock_id GROUP BY stock.stock_name');

$query='SELECT stock.stock_name,price.price,price.time FROM stock,price WHERE stock.stock_id=price.stock_id';
$result1=$dbh->query($query);
//$result1=$dbh->query('SELECT stock.stock_name,price.price,price.time FROM stock,price WHERE stock.stock_id=price.stock_id');
while($row=$result->fetch()){
    $arr['name'][]=$row['stock_name'];
//    $arr['price'][]=$row['price'];
//    $arr['time']=$row['time'];
}
//$data = $result1->fetchAll();
//$num=count($data);
//
//while ($a=$result1->fetch()){
//    $arr['price1'][]=$a['price'];
//}
$i=1;
foreach ($result1->fetchAll() as $value){
    $a=$i++;
    if($a<=6) $arr['price0'][]=$value['price'];
    if($a<=6) $arr['time'][]=$value['time'];
    if($a>6&&$a<=12) $arr['price1'][]=$value['price'];
    if($a>12) $arr['price2'][]=$value['price'];

}
//$data['time']=array_unique($arr['time']);
//$data['name']=array_unique($arr['name']);
//$data['price']=$arr['price'];
//print_r($arr);

echo json_encode($arr); //输出json格式数据