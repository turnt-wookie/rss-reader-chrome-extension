<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$response = array();
$response['data'] = [];

$page_number = $_GET['page'];
$response['page'] = 1;
$query = "SELECT * FROM news LIMIT 5;";

switch ($page_number) {
    case 1:
        $response['page'] = 1;
        $query = "SELECT * FROM news LIMIT 5;";
        break;
    case 2:
        $response['page'] = 2;
        $query = "SELECT * FROM news LIMIT 5, 5;";
        break;
    case 3:
        $response['page'] = 3;
        $query = "SELECT * FROM news LIMIT 10, 5;";
        break;
    case 4:
        $response['page'] = 4;
        $query = "SELECT * FROM news LIMIT 15, 5;";
        break;
        
    default:
        $response['page'] = 1;
        $query = "SELECT * FROM news LIMIT 5;";
        break;
}


$con = mysqli_connect('localhost', 'root', '', 'nyt_news');
$result = mysqli_query($con, $query);
mysqli_close($con);

while ($row = mysqli_fetch_assoc($result)) {
    $response['data'][] = $row;
}

echo json_encode($response);
