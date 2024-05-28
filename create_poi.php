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
$name = $_POST['name'];
$description = $_POST['description'];
$address = $_POST['address'];
$category = $_POST['category'];
$phone = $_POST['phone'];
$website = $_POST['website'];

if (is_numeric($latitude) && is_numeric($longitude) && !empty($name) && !empty($description) && !empty($address) && !empty($category) && !empty($phone) && !empty($website)) {
  $stmt = $conn->prepare("INSERT INTO poi (latitude, longitude, name, description, address, category, phone, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ddssssss", $latitude, $longitude, $name, $description, $address, $category, $phone, $website);

  if ($stmt->execute()) {
    echo "Data successfully added";
  } else {
    echo "Error: " . $stmt->error;
  }

  $stmt->close();
} else {
  echo "Invalid data";
}

$conn->close();
?>
