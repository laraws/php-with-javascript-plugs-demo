<?php
/**
 * Created by PhpStorm.
 * User: shaowen.wang
 * Date: 2018/1/9
 * Time: 13:12
 */

//数组转化成字符串
//$arr = array(1,2,3,4);
//echo implode(",",$arr);


//匿名函数的一些参数和变量的调用方式
//$message=123;
//$example = function ($arg) use ($message) {
//    var_dump($arg . ' ' . $message);
//};
//$example("hello");


// 一个基本的购物车，包括一些已经添加的商品和每种商品的数量。
// 其中有一个方法用来计算购物车中所有商品的总价格，该方法使
// 用了一个 closure 作为回调函数。
//class Cart
//{
//    const PRICE_BUTTER  = 1.00;
//    const PRICE_MILK    = 3.00;
//    const PRICE_EGGS    = 6.95;
//
//    //定义$products是一个数组
//    protected   $products = array();
//
//    //添加商品名字和对应的数量
//    public function add($product, $quantity)
//    {
//        $this->products[$product] = $quantity;
//    }
//
//    //获取商品恩数量
//    public function getQuantity($product)
//    {
//        return isset($this->products[$product]) ? $this->products[$product] :
//               FALSE;
//    }
//
//    //商品总价
//    public function getTotal($tax)
//    {
//        $total = 0.00;
//
//        $callback =
//            function ($quantity, $product) use ($tax, &$total)
//            {
//                $pricePerItem = constant(__CLASS__ . "::PRICE_" .
//                    strtoupper($product));
//                $total += ($pricePerItem * $quantity) * ($tax + 1.0);
//            };
//
//        //array_walk — 使用用户自定义函数对数组中的每个元素做回调处理
//        //将用户自定义函数 funcname 应用到 array 数组中的每个单元。
//        //典型情况下 callback 接受两个参数。array 参数的值作为第一个，键名作为第二个。
//        array_walk($this->products, $callback);
//        return round($total, 2);;
//    }
//}
//
//$my_cart = new Cart;
//
//// 往购物车里添加条目
//$my_cart->add('butter', 1);
//$my_cart->add('milk', 3);
//$my_cart->add('eggs', 6);
//
//// 打出出总价格，其中有 5% 的销售税.
//print $my_cart->getTotal(0.05) . "\n";
//// 最后结果是 54.29



//注意php变量的范围,在方法里面不声明外表变量的话,不能访问
//$a = 1; /* global scope */
//
//function Test()
//{
//    echo $a; /* reference to local scope variable */
//}
//
//Test();

//使用global关键字来使用变量
//$a = 1;
//$b = 2;
//function Sum()
//{
//    global $a, $b;
//
//    $b = $a + $b;
//}
//Sum();
//echo $b;

//使用 $GLOBALS 替代 global
//$a = 1;
//$b = 2;
//function Sum()
//{
//    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
//}
//Sum();
//echo $b;

//array_map — 为数组的每个元素应用回调函数
//callback回调函数，应用到每个数组里的每个元素。
//array1数组，遍历运行 callback 函数。
//$numberPlusOne = array_map(function ($number) {
//    return $number += 1;
//}, [1, 2, 3]);
//print_r($numberPlusOne);

$a=1;
$b=2;
echo $a+$b;

