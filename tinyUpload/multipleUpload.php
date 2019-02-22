
<?php
//计算有多少个文件
$total = count($_FILES['files']['name']);
echo $total;

print_r($_FILES['files']);

//循环获取每个文件的各个字段的数据
for ($i = 0; $i < $total; $i++) {
    $fileName = $_FILES["files"]["name"][$i]; // The file name
    $fileTmpLoc = $_FILES["files"]["tmp_name"][$i]; // File in the PHP tmp folder
    $fileType = @$_FILES["files"]["image/png||image/jpg"][$i];  // The type of file it is
    $fileSize = $_FILES["files"]["size"][$i]; // File size in bytes
    $fileErrorMsg = $_FILES["files"]["error"][$i]; // 0 = false | 1 = true
    $kaboom = explode(".",$_FILES["files"]["name"][$i]); // Split file name into an array using the dot
    $fileExt = end($kaboom); // Now target the last array element to get the file extension

    //将临时保存的文件移动到自己所指定的位置和指定的文件名
    $moveResult= move_uploaded_file($fileTmpLoc, "uploads/aaa.$fileExt.$fileName");
    unlink($fileTmpLoc); // Remove the uploaded file from the PHP temp folder
    echo $fileName.'<br>';
}

