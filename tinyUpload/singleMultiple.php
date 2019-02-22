<?php
$image = $_FILES['image'];
$txt = $_FILES['txt'];
echo $txt;
print_r($image);
print_r($txt);

$imageName = $image['name'];
$txtName = $txt['name'];

$imageTmp = $image['tmp_name'];
$txtTmp = $image['tmp_name'];

move_uploaded_file($imageTmp, "uploads/$imageName");
move_uploaded_file($txtTmp, "uploads/$txtName" );
//echo 1;

