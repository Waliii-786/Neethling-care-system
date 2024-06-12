<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'react_auth');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Simulate sending email
    echo json_encode(['success' => true, 'message' => 'Password reset email sent']);
} else {
    echo json_encode(['success' => false, 'message' => 'No user found with that email']);
}

$conn->close();
?>
