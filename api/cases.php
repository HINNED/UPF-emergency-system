<?php
header('Content-Type: application/json');

// Mock database for cases
$cases = [
    [
        'caseNumber' => 'UPF/230615/042',
        'callerName' => 'Sarah K.',
        'callerPhone' => '0755123456',
        'emergencyType' => 'Armed Robbery',
        'description' => 'Armed robbery at Ntinda shopping center',
        'location' => [
            'name' => 'Ntinda',
            'lat' => 0.3480,
            'lng' => 32.6165
        ],
        'referralStation' => 'Ntinda',
        'dateTime' => '2023-06-15T14:30:00Z',
        'status' => 'pending',
        'assignedOfficer' => 'John Okello'
    ],
    [
        'caseNumber' => 'UPF/230615/041',
        'callerName' => 'Robert M.',
        'callerPhone' => '0777654321',
        'emergencyType' => 'Road Accident',
        'description' => 'Serious accident on Kiira Road near Shell station',
        'location' => [
            'name' => 'Kiira Road',
            'lat' => 0.3376,
            'lng' => 32.5862
        ],
        'referralStation' => 'Kiira Road',
        'dateTime' => '2023-06-15T13:45:00Z',
        'status' => 'in-progress',
        'assignedOfficer' => 'Sarah Nalwoga'
    ]
];

echo json_encode($cases);
?>