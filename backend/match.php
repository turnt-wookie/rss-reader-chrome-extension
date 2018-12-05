<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$searchTerm = $_GET['q'];

$query = "SELECT * FROM news WHERE match(title, description) against('$searchTerm' IN BOOLEAN MODE)";

$con = mysqli_connect('localhost', 'root', '', 'nyt_news');
$result = mysqli_query($con, $query);
mysqli_close($con);

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
