<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

// Mock user database
$users = [
    'officer1' => [
        'password' => 'officer123',
        'role' => 'officer',
        'station' => 'Naguru CPS'
    ],
    'station1' => [
        'password' => 'station123',
        'role' => 'station',
        'station' => 'Kiira Road',
        'stationKey' => 'kiira2023'
    ],
    'admin' => [
        'password' => 'admin123',
        'role' => 'admin'
    ]
];

$response = ['success' => false, 'message' => ''];

if (isset($input['username']) && isset($input['password']) && isset($input['role'])) {
    $username = $input['username'];
    $password = $input['password'];
    $role = $input['role'];
    $stationKey = $input['stationKey'] ?? '';
    
    if (isset($users[$username]) && $users[$username]['password'] === $password) {
        if ($users[$username]['role'] === $role) {
            // Additional check for station role
            if ($role === 'station' && (!isset($users[$username]['stationKey']) || $users[$username]['stationKey'] !== $stationKey)) {
                $response['message'] = 'Invalid station key';
            } else {
                $response['success'] = true;
                $response['user'] = [
                    'username' => $username,
                    'role' => $role,
                    'station' => $users[$username]['station'] ?? null
                ];
            }
        } else {
            $response['message'] = 'User does not have this role';
        }
    } else {
        $response['message'] = 'Invalid username or password';
    }
} else {
    $response['message'] = 'Missing required fields';
}

echo json_encode($response);
?>
<?php
// auth.php with security enhancements
header('Content-Type: application/json');

// Input sanitization
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

$input = json_decode(file_get_contents('php://input'), true);
$input = sanitizeInput($input);

// Rate limiting - simple implementation
session_start();
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['last_attempt'] = time();
}

if ($_SESSION['login_attempts'] > 5 && (time() - $_SESSION['last_attempt']) < 300) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many attempts. Try again later.']);
    exit;
}

// Mock user database with password hashing
$users = [
    'officer1' => [
        'password_hash' => password_hash('officer123', PASSWORD_BCRYPT),
        'role' => 'officer',
        'station' => 'Naguru CPS'
    ],
    // ... other users
];

$response = ['success' => false, 'message' => ''];

if (isset($input['username']) && isset($input['password']) && isset($input['role'])) {
    $username = $input['username'];
    
    if (isset($users[$username]) && password_verify($input['password'], $users[$username]['password_hash'])) {
        if ($users[$username]['role'] === $input['role']) {
            // Additional check for station role
            if ($input['role'] === 'station' && (!isset($users[$username]['stationKey']) || 
                !password_verify($input['stationKey'], $users[$username]['stationKey']))) {
                $response['message'] = 'Invalid station key';
            } else {
                // Successful login
                $_SESSION['login_attempts'] = 0;
                $response['success'] = true;
                $response['user'] = [
                    'username' => $username,
                    'role' => $input['role'],
                    'station' => $users[$username]['station'] ?? null
                ];
                
                // Generate and return a secure token
                $response['token'] = bin2hex(random_bytes(32));
                $_SESSION['auth_token'] = $response['token'];
            }
        } else {
            $response['message'] = 'User does not have this role';
        }
    } else {
        $response['message'] = 'Invalid username or password';
        $_SESSION['login_attempts']++;
        $_SESSION['last_attempt'] = time();
    }
} else {
    $response['message'] = 'Missing required fields';
}

echo json_encode($response);
?>