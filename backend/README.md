# User API Documentation

## Register User

Register a new user in the system.

### Endpoint

```
POST /api/v1/users/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string", // Minimum 3 characters
    "lastName": "string" // optional
  },
  "email": "string", // Must be a valid email
  "password": "string" // Minimum 6 characters required
}
```

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Success Response

**Status Code**: 201 Created

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Missing Required Fields

**Status Code**: 400 Bad Request

```json
{
  "error": "All fields are required"
}
```

## Login User

Authenticate an existing user and receive a JWT token.

### Endpoint

```
POST /api/v1/users/login
```

### Request Body

```json
{
  "email": "string", // Must be a valid email
  "password": "string" // Minimum 6 characters required
}
```

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Success Response

**Status Code**: 200 OK

```json
{
  "user": {
    "email": "john.doe@example.com"
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

#### Invalid Credentials

**Status Code**: 401 Unauthorized

```json
{
  "error": "Invalid email or password"
}
```

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Security Features

- Password comparison is done securely using bcrypt
- JWT token is generated upon successful login
- Password is excluded from response payloads

### Notes

- The provided email must exist in the system
- Passwords are case-sensitive
- The response includes a JWT token that can be used for authentication

## Get User Profile

Retrieve the profile information of the authenticated user.

### Endpoint

```
GET /api/v1/users/profile
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses

#### Unauthorized Access

**Status Code**: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

#### Invalid Token

**Status Code**: 401 Unauthorized

```json
{
  "message": "Invalid token"
}
```

### Notes

- Requires a valid JWT token in the Authorization header
- Password is automatically excluded from the response
- The endpoint only returns the authenticated user's own profile

## Logout User

Logout the currently authenticated user and invalidate their token.

### Endpoint

```
GET /api/v1/users/logout
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "message": "Logout successful"
}
```

### Error Responses

#### Unauthorized Access

**Status Code**: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

### Security Features

- The JWT token is blacklisted upon logout
- HTTP-only cookie containing the token is cleared
- Subsequent requests with the same token will be rejected

### Notes

- The token can be provided either through cookies or Authorization header
- After logout, the token cannot be reused and a new login will be required
- All sessions using the logged-out token will be invalidated

# Driver API Documentation

## Register Driver

Register a new driver in the system with vehicle details.

### Endpoint

```
POST /api/v1/drivers/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string", // minimum 3 characters required
    "lastName": "string" // optional
  },
  "email": "string", // Must be a valid email
  "password": "string", // Minimum 6 characters required
  "vehicle": {
    "color": "string", // minimum 3 characters required
    "plate": "string", // minimum 3 characters required
    "capacity": "number", // must be an integer greater than or equal to 1
    "vehicleType": "string" // must be either "car" or "motorcylcle" or "auto"
  }
}
```

### Success Response

**Status Code**: 201 Created

```json
{
  "driver": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

#### Driver Already Exists

**Status Code**: 400 Bad Request

```json
{
  "message": "Driver already exists"
}
```

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Login Driver

Authenticate an existing driver and receive a JWT token.

### Endpoint

```
POST /api/v1/drivers/login
```

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- **email**: Must be a valid email address
- **password**: Minimum 6 characters required

### Success Response

**Status Code**: 200 OK

```json
{
  "driver": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

#### Invalid Credentials

**Status Code**: 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Get Driver Profile

Retrieve the profile information of the authenticated driver.

### Endpoint

```
GET /api/v1/drivers/profile
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "driver": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

#### Unauthorized Access

**Status Code**: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

## Logout Driver

Logout the currently authenticated driver and invalidate their token.

### Endpoint

```
POST /api/v1/drivers/logout
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "message": "Logout successful"
}
```

### Error Responses

#### Unauthorized Access

**Status Code**: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

### Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication
- Passwords are never returned in responses
- Tokens can be provided via HTTP-only cookies or Authorization header
- Tokens are blacklisted on logout
- Authentication middleware (authDriver) protects private routes
