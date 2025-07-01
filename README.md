README.md – Emergency Response System for Uganda
 Project Name: Emergency Response System (999-UG)
A unified digital emergency response platform for Uganda, developed to enhance the efficiency and responsiveness of police and emergency services.
 Project Description
The 999 Emergency Response System is designed to digitally transform Uganda’s police emergency hotline. The system automatically redirects emergency calls to the nearest police post, tracks caller location, captures real-time audio, and notifies nearby responders. It ensures real-time accountability and drastically improves emergency handling in Uganda.
Key Features
•	 Call Routing: Automatically redirects 999 calls to the closest police station.
•	 Caller Location Tracking: Displays exact caller coordinates on a map.
•	Automatic Call Recording: All emergency calls are recorded for safety and accountability.
•	 Responder Notification: Nearest police officers are alerted instantly.
•	 Personnel Monitoring: Tracks whether officers are answering/responding to calls.
•	 Secure Admin Panel: For police administrators and supervisors.
•	 Public-Only Access via Call: Public only access the system by calling 999. No app or web login.
 Designed For:
- Uganda Police Force
- Emergency Coordinators
- Government Emergency Agencies
Technologies Used
Component	Technology
Frontend	React.js / HTML / CSS / JS
Backend	Node.js / Express / Firebase / PHP
Database	Firebase / MySQL
Location Services	Google Maps API / GPS
VoIP/Telephony	Twilio or local telco integration
Recording	MediaRecorder API / SIP-enabled VoIP
Project Structure

/frontend          # UI dashboard for admin and police  
/backend           # API endpoints, database, logic  
/call-center       # Call routing and SIP integration  
/database          # Emergency logs and user data  
/docs              # README, user guide, and documentation  

 Setup & Installation

# Clone repository
git clone https://github.com/HINNED/UPF-emergency-system

# Frontend
cd frontend
npm install
npm start

# Backend
cd ../backend
npm install
npm start

# Configure database and location services in /config

 Security & Privacy
- All data is end-to-end encrypted.
- All users are authenticated.
- Only authorized government agents can access sensitive data.

