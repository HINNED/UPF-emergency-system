# UPF Emergency Management System (UPF EMS)

## Overview
The UPF Emergency Management System (UPF EMS) is a web application designed to facilitate the management of emergency cases, user authentication, and notifications within the Uganda Police Force. This system aims to streamline the reporting and handling of emergencies, ensuring efficient communication and response.

## Features
- User authentication (login and registration)
- Management of emergency cases (create, retrieve, update)
- Notification system for case updates and user alerts
- Role-based access control for different user types (officers, admin)
- Database integration for persistent data storage

## Project Structure
```
backend-upf-ems
├── src
│   ├── controllers          # Contains logic for handling requests
│   ├── models               # Defines data schemas
│   ├── routes               # API endpoint definitions
│   ├── middleware           # Custom middleware for authentication and error handling
│   ├── config               # Database configuration
│   ├── app.js               # Express application setup
│   └── server.js            # Server initialization and connection to the database
├── database
│   └── schema.sql          # SQL schema for database setup
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend-upf-ems
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Create a database in your preferred SQL server.
   - Run the SQL commands in `database/schema.sql` to set up the necessary tables.

4. Configure environment variables:
   - Create a `.env` file in the root directory and add your database connection details and any other required environment variables.

## Usage
1. Start the server:
   ```
   npm start
   ```

2. Access the API endpoints via:
   ```
   http://localhost:<port>
   ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.