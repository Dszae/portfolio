<?php
// contact.php - Place in your public/ root directory

// Strict CORS and preflight handling for decoupled architectures
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs strictly
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Fallback for JSON payloads if FormData isn't used
    if (empty($name) || empty($email) || empty($message)) {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        if ($data) {
            $name = htmlspecialchars(strip_tags($data['name'] ?? ''));
            $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
            $message = htmlspecialchars(strip_tags($data['message'] ?? ''));
        }
    }

    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = "contact@dsz.ae"; // Replace with actual receiving email
        $subject = "PORTFOLIO TRANSMISSION: from $name";
        
        $body = "ENTITY: $name\n";
        $body .= "RETURN ADDRESS: $email\n\n";
        $body .= "PAYLOAD:\n$message\n";
        
        $headers = "From: server@yourdomain.com\r\n"; // Replace with validated server email
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        if (mail($to, $subject, $body, $headers)) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Transmission complete."]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Server rejected transmission."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid payload parameters."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
?>