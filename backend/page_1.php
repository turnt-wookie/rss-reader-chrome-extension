<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$data = array();
$query = "SELECT * FROM news LIMIT 5;";

$con = mysqli_connect('localhost', 'root', '', 'nyt_news');
$result = mysqli_query($con, $query);
mysqli_close($con);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
