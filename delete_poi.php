<?php
$servername = "localhost";
$username = "root";
$password = "password_baru";
$dbname = "map_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

if (is_numeric($latitude) && is_numeric($longitude)) {
  $stmt = $conn->prepare("DELETE FROM poi WHERE latitude = ? AND longitude = ?");
  $stmt->bind_param("dd", $latitude, $longitude);

  if ($stmt->execute()) {
    echo "Data successfully deleted";
  } else {
    echo "Error: " . $stmt->error;
  }

  $stmt->close();
} else {
  echo "Invalid data";
}

$conn->close();
?>
