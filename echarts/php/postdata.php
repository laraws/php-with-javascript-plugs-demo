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
//$name=$_POST['name'];
$name=$_POST['name'] ?$_POST['name'] :"招商银行";
$datefrom=$_POST['datefrom'] ? $_POST['datefrom']: "2018-01-01";
$dateto=$_POST['dateto'] ? $_POST['dateto']: "2018-01-06";
$query="SELECT stock.stock_name,price.price,price.time FROM stock,price WHERE stock.stock_id=price.stock_id AND stock.stock_name='{$name}' AND price.time BETWEEN '{$dateform}' and '{$dateto}'";
$result1=$dbh->query($query);

$arr['name'][]=$name;

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