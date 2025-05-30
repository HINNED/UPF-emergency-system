// Map functionality
let map;
let marker;

function initMap(lat = 0.3136, lng = 32.5811, mapId = 'locationMap') {
    // Initialize map centered on Kampala
    map = L.map(mapId).setView([lat, lng], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker
    marker = L.marker([lat, lng]).addTo(map)
        .bindPopup('Emergency location')
        .openPopup();
}

function updateMap(lat, lng) {
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]).update();
}

// SMS Notification Function (mock)
function sendSMSNotification(recipient, message) {
    console.log(`Sending SMS to ${recipient}: ${message}`);
    // In a real system, this would integrate with an SMS gateway API
    return true;
}