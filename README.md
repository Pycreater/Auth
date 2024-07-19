# Auth

This repository contains an authentication system built using NestJS. It supports user registration, login, and token-based authentication with JWT.

## Features

- User Registration
- User Login
- JWT Authentication

## Technologies Used

- TypeScript
- NestJS
- JWT
- MongoDB

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Pycreater/Auth.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Auth
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your MongoDB and JWT configurations:
    ```env
    PORT=8000
    MONGODB_URI=
    CORS_ORIGIN=
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRY=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRY=
    ```

### Running the Application

Run the following command to start the application:
```sh
npm run start
```

The application will be accessible at `http://localhost:8000`.

## API Endpoints

### Authentication

- **Register**: `POST /api/v1/user/register`
    ```json
    {
        "username": "your_username",
        "password": "your_password",
        "email": "your_email"
    }
    ```

- **Login**: `POST /api/v1/user/login`
    ```json
    {
        "email": "your_email",
        "password": "your_password"
    }
    ```

### Secured Endpoints

These endpoints require a valid JWT token to access.

- **User Logout**: `POST /api/v1/user/logout`
    - Headers: `Authorization: Bearer <your_jwt_token>`

- **Change-password**: `POST /api/v1/user/forgot-password`
    - Headers: `Authorization: Bearer <your_jwt_token>`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [MIT](MIT) file for details.
