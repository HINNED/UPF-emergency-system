Uganda Police Force Emergency Management System (UPF-EMS) 

Table of Contents 
1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [System Requirements](#system-requirements)  
4. [Installation & Setup](#installation--setup)  



Overview 
The **Uganda Police Force Emergency Management System (UPF-EMS)** is a digital platform designed to enhance emergency response coordination within the **Kampala Metropolitan area**. The system provides **role-based access** to police personnel, ensuring efficient case logging, tracking, and resolution.  

Key Objective 
Streamline emergency reporting -----with automated case generation  
Improve response time---- with live location tracking  
Enhance accountability---with digital case files and reports  
Ensure security---- with role-based permissions  


Key Features 

| Feature | Description |

Role-Based Access:  Three distinct interfaces for Officer1, Station, and Admin
Automated Case Numbering: Unique case IDs generated in format `UPF/YYYY/XXXX`
Live GPS Tracking:  Real-time mapping of emergency locations |
|SMS Notifications:    Alerts sent to DPC, O/C Station, and O/C Operations
Case Referral System: Seamless transfer of cases between stations
Digital Case Files:  Secure storage of incident reports and updates |
Admin Dashboard:  Full system control, user management, and analytics |



System Requirements 

Backend (Server) 
- Python 
- MySQL 
- SMS Gateway API (for notifications)  

Frontend (User Interface) 
- Modern Browser (Chrome, Firefox, Edge)  
- Internet Connection 
- GPS Support (for location tracking)  


Installation & Setup  

1. Backend Setup
```bash
Clone the repository
git clone https://github.com/upf/ems.git
cd ems/backend

# Set up a virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Configure database in `config.py`
# Then initialize the database
flask db init
flask db migrate
flask db upgrade

# Run the server
flask run
```

2. Frontend Setup 
```bash
cd ../frontend
npm install  # If using React/Vue
npm start   # Launch development server
```
      
3. SMS Gateway Setup
- Configure `sms_config.ini` with provider credentials (MTN, Airtel).  



