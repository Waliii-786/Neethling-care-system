<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'react_auth');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, username, email, password) VALUES ('$name', '$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
