# User API Documentation

## Register User

Register a new user in the system.

### Endpoint

```
POST /user/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string" // optional
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- **firstName**: Minimum 3 characters required
- **email**: Must be a valid email address
- **password**: Minimum 6 characters required

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
POST /user/login
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
GET /user/profile
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
GET /user/logout
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
POST /drivers/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string" // optional
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

### Validation Rules

- **firstName**: Minimum 3 characters required
- **email**: Must be a valid email address
- **password**: Minimum 6 characters required
- **vehicle.color**: Minimum 3 characters required
- **vehicle.plate**: Minimum 3 characters required
- **vehicle.capacity**: Must be an integer greater than or equal to 1
- **vehicle.vehicleType**: Must be either "car" or "motorcylcle"

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
POST /drivers/login
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
GET /drivers/profile
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
POST /drivers/logout
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

### General Notes

1. **Authentication:**

   - All protected routes require the authDriver middleware
   - JWT tokens are issued upon registration and login
   - Tokens must be included in subsequent requests

2. **Password Security:**

   - Passwords are hashed before storage
   - Minimum password length is 6 characters
   - Password comparison is done securely

3. **Session Management:**

   - Tokens are stored in HTTP-only cookies for security
   - Tokens are blacklisted upon logout
   - Blacklisted tokens cannot be reused

4. **Vehicle Information:**

   - Vehicle type must be either "car" or "motorcylcle"
   - Vehicle capacity must be at least 1
   - Color and plate number must be at least 3 characters

5. **Error Handling:**
   - Proper validation errors are returned for invalid inputs
   - Authentication errors are properly handled
   - Duplicate email registration is prevented

# Ride API Documentation

## Create Ride

Create a new ride request.

### Endpoint

```
POST /rides
```

### Request Body

```json
{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "string"
}
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 201 Created

```json
{
  "ride": {
    "userId": "string",
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string",
    "status": "string"
  }
}
```

### Error Responses

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

## Get Fare Estimate

Get an estimated fare for a ride.

### Endpoint

```
GET /rides/fare
```

### Query Parameters

```
pickup: string
destination: string
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "estimatedFare": "number",
  "currency": "string"
}
```

### Error Responses

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid location",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

### Security Features

- All endpoints require authentication via JWT token
- Input validation is performed on all parameters
- Error handling follows consistent patterns
- Protected against unauthorized access

### General Notes

1. **Authentication:**

   - All routes require valid JWT token
   - Token must be included in Authorization header

2. **Input Validation:**

   - Address inputs require minimum 3 characters
   - All location parameters are validated
   - Proper error messages for invalid inputs

3. **Error Handling:**

   - Consistent error response format
   - Appropriate HTTP status codes
   - Detailed error messages for debugging

4. **Rate Limiting:**
   - Consider implementing rate limiting for map API endpoints
   - Protect against excessive API usage

# Map API Documentation

## Get Coordinates

Convert an address into geographic coordinates.

### Endpoint

```
GET /map/get-coordinates
```

### Query Parameters

```
address: string (minimum 3 characters)
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "coordinates": {
    "lat": "number",
    "lng": "number"
  }
}
```

### Error Responses

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid address",
      "param": "address",
      "location": "query"
    }
  ]
}
```

#### Coordinates Not Found

**Status Code**: 404 Not Found

```json
{
  "message": "Coordinates not found"
}
```

## Get Distance and Time

Calculate the distance and estimated travel time between two locations.

### Endpoint

```
GET /map/get-distance-time
```

### Query Parameters

```
origin: string (minimum 3 characters)
destination: string (minimum 3 characters)
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "distance": "string",
  "duration": "string"
}
```

### Error Responses

#### Invalid Input

**Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid origin/destination",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

## Get Address Suggestions

Get autocomplete suggestions for a partial address input.

### Endpoint

```
GET /map/get-suggestions
```

### Query Parameters

```
input: string (minimum 3 characters)
```

### Headers Required

```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response

**Status Code**: 200 OK

```json
{
  "suggestions": [
    {
      "address": "string",
      "placeId": "string"
    }
  ]
}
```

### Error Responses

#### Missing Input

**Status Code**: 400 Bad Request

```json
{
  "message": "The 'input' query parameter is required."
}
```
