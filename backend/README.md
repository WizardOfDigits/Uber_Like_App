# Backend API Documentation

## Base URL

`http://localhost:4000/api/v1`

## Authentication

**Header Format**

```http
Authorization: Bearer <JWT_TOKEN>
```

## User Management

`POST /api/v1/users/register`

### 1. User Registration

**Endpoint**  
`POST /users/register`

**Request Format**  
| Field | Type | Constraints | Description |
|--------------------|------|-----------------|-------------|
| fullname.firstname | string | ≥3 characters | Required |
| fullname.lastname | string | Optional | \_ |
| email | string | Valid format | Required |
| password | string | ≥6 characters | Required |

**Response**

```json
201 Created
{
  "user": { /* user details */ },
  "token": "jwt.token.here"
}
```

#### Error Responses

**Invalid Input**

```json
400 Bad Request
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

```json
400 Bad Request
{
  "error": "All fields are required"
}
```

### 2. User Login

**Endpoint**

`POST /users/login`

**Request Format**  
| Field | Type | Constraints | Description |  
|-------|------|-------------|-------------|  
| email | string | Valid format | Required |  
| password | string | ≥6 characters | Required |

**Response**

```json
200 OK
{
  "user": {
    "email": "john.doe@example.com"
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

**Invalid Credentials**

```json
401 Unauthorized

{
  "error": "Invalid email or password"
}
```

#### Invalid Input

```json
400 Bad Request

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

**Security Features**

- BCrypt password comparison
- JWT token generation
- Sensitive data exclusion

**Notes**

- Email must be registered
- Case-sensitive credentials
- Token valid for 24h

---

### 3. User Profile

**Endpoint**  
`GET /users/profile`

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
200 OK
{
  "user": { /* user details */ },
}
```

#### Error Responses

**Unauthorized**

```json
401 Unauthorized
{
  "message": "Authentication required"
}
```

**Invalid Token**

```json
401 Unauthorized
{
  "message": "Invalid token"
}
```

### Notes

- Requires a valid JWT token in the Authorization header
- Password is automatically excluded from the response
- The endpoint only returns the authenticated user's own profile

---

### 4. User Logout

**Endpoint**  
`GET /users/logout`

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
200 OK
{
  "message": "Logout successful"
}
```

#### Error Responses

**Unauthorized Access**

```json
401 Unauthorized

{
  "message": "Authentication required"
}
```

---

**Security Implementation**

- Token blacklisting
- Cookie invalidation
- Session termination

---

## Driver Management

### 1. Driver Registration

**Endpoint**

`POST /users/register`

**Request Format**  
| Field | Type | Constraints | Description |  
|-------|------|-------------|-------------|  
| fullName.firstName | string | ≥3 characters | Required |  
| fullName.lastName | string | Optional | - |  
| email | string | Valid format | Required |  
| password | string | ≥6 characters | Required |

**Response**

```json
201 Created
{
  "user": { /* user details */ },
  "token": "jwt.token.here"
}
```

#### Error Responses

**Existing Driver**

```json
400 Bad Request
{
  "message": "Driver already exists"
}
```

**Validation Error**

```json
400 Bad Request
{
  "errors": [
    {
      "msg": "Invalid vehicleType",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

---

### 2. Driver Login

**Endpoint**

`POST /drivers/login`

**Request Format**  
| Field | Type | Constraints | Description |  
|-------|------|-------------|-------------|  
| email | string | Valid format | Required |  
| password | string | ≥6 characters | Required |

**Success Response**

```json
200 OK
{
  "user": { /* authenticated user */ },
  "token": "new.jwt.token"
}
```

### Error Responses

**Invalid Credentials**

```json
401 Unauthorized

{
  "error": "Invalid email or password"
}
```

#### Invalid Input

```json
400 Bad Request

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

**Security Features**

- BCrypt password comparison
- JWT token generation
- Sensitive data exclusion

**Notes**

- Email must be registered
- Case-sensitive credentials
- Token valid for 24h

---

### 3. Driver Profile

**Endpoint**  
`GET /drivers/profile`

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
200 OK
{
  "driver": { /* driver details */ },
}
```

#### Error Responses

**Unauthorized**

```json
401 Unauthorized
{
  "message": "Authentication required"
}
```

**Invalid Token**

```json
401 Unauthorized
{
  "message": "Invalid token"
}
```

### Notes

- Requires a valid JWT token in the Authorization header
- Password is automatically excluded from the response
- The endpoint only returns the authenticated user's own profile

---

### 4. Driver Logout

**Endpoint**  
`GET /drivers/logout`

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
200 OK
{
  "message": "Logout successful"
}
```

#### Error Responses

**Unauthorized Access**

```json
401 Unauthorized

{
  "message": "Authentication required"
}
```

---

**Security Implementation**

- Token blacklisting
- Cookie invalidation
- Session termination

---

## Ride Management

### 1. Create Ride Request

**Endpoint**  
`POST /rides`

## Authentication

**Header Format**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Parameters**  
| Field | Validation |  
|-------|------------|  
| pickup | Valid address string |  
| destination | Valid address string |  
| vehicleType | car/motorcycle/auto |

**Response**

```json
201 Created

{
  "user": "....",
  "pickup": ".....",
  "destination"":"....",
  "fare": ....,
    "status": "......",
    "otp": "......",
    "_id": ".......",
}
```

#### Error Responses

**Invalid Input**

```json
400 Bad Request

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

### 2. Fare Estimation

**Endpoint**  
`GET /rides/fare?pickup=...&destination=...`

**Response**

```json
200 OK
{
  "estimatedFare": 19.75,
  "currency": "USD",
  "distance": "2.3 km"
}
```

---

#### Error Responses

**Invalid Input**

```json
400 Bad Request

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

## Map Services

### 1. Get Coordinates(Geocoding)

**Endpoint**  
`GET /map/coordinates?address=...`

**Requirements**  
| Field | Type | Allowed Values |  
|-------|------|----------------|  
| address| string |≥3 characters |

**Response**

```json
200 OK
{
  "lat": 27.7172,
  "lng": 85.3240
}
```

#### Error Responses

**Invalid Input**

```json
400 Bad Request

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

```json
404 Not Found

{
  "message": "Coordinates not found"
}
```

---

### 2. Calculate Distance & Time

**Endpoint**  
`GET /map/get-distance-time`

**Query Parameters**  
| Parameter | Type | Constraints |  
|-----------|------|-------------|  
| origin | string | ≥3 characters |  
| destination | string | ≥3 characters |

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Success Response**

```json
200 OK
{
  "distance": "4.2 km",
  "duration": "12 mins"
}
```

#### Error Responses

**Invalid Locations**

```json
400 Bad Request
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

---

### 3. Address Suggestions

**Endpoint**  
`GET /map/get-suggestions`

**Query Parameters**  
| Parameter | Type | Constraints |  
|-----------|------|-------------|  
| input | string | ≥3 characters |

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Success Response**

```json
200 OK
{
  "suggestions": [
    {
      "address": "Times Square, Manhattan, NY",
      "placeId": "ChIJmQJIxlVYwokR5EqrNDOX3d0"
    }
  ]
}
```

#### Error Responses

**Missing Query**

```json
400 Bad Request
{
  "message": "The 'input' query parameter is required."
}
```

---

**Common Status Codes**  
| Code | Description |  
|------|-------------|  
| 200 | Successful request |  
| 201 | Resource created |  
| 400 | Invalid/missing input |  
| 401 | Authentication failure |  
| 404 | Resource not found |  
| 429 | Rate limit exceeded |  
| 500 | Server-side error |
