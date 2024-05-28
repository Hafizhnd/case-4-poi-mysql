<?php
$servername = "localhost";
$username = "root";
$password = "password_baru";
$dbname = "map_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT latitude, longitude, name, description, address, category, phone, website FROM poi";
$result = $conn->query($sql);

$pois = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $pois[] = $row;
  }
}

echo json_encode($pois);

$conn->close();
?>
