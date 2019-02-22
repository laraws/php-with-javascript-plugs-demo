<?php
/**
 * Created by PhpStorm.
 * User: shaowen.wang
 * Date: 2018/2/12
 * Time: 9:31
 */
if(!empty($_FILES)) {

    //database configuration
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '123456';
    $dbName = 'uploads';
    //connect with the database
    $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    $targetDir = "uploads/";
    $fileName = $_FILES['qqfile']['name'];
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES['qqfile']['tmp_name'], $targetFile)) {
        //insert file information into db table
        $conn->query("INSERT INTO files (file_name, uploaded) VALUES('" . $fileName . "','" . date("Y-m-d H:i:s", strtotime(gmdate('Y-m-d H:i:s').' +8 hours')) . "')");
    }

    $a['success'] = true;
    echo json_encode($a);
}
