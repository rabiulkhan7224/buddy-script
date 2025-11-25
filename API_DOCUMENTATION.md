# BuddyScript Backend API Documentation

## Project Structure
```
src/app/
├── schemas/          # Mongoose models
│   ├── user.schema.ts
│   ├── post.schema.ts
│   └── comment.schema.ts
├── modules/          # Feature modules (MVC pattern)
│   ├── auth/         # User authentication
│   ├── post/         # Post CRUD & likes
│   └── comment/      # Comment CRUD & replies & likes
├── services/         # Business logic
│   └── likeService.ts
├── middlewares/      # Express middlewares
├── routers/          # Route configuration
└── utils/            # Utility functions
```

---

## Authentication Module

### Base URL
```
/v1/api/auth
```

### Endpoints

#### 1. **Signup** (Register New User)
```
POST /v1/api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}
```

**Response (201)**
```json
{
  "status": 201,
  "success": true,
  "message": "User registered successfully!",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "isEmailVerified": false,
      "isPhoneVerified": false,
      "createdAt": "2025-11-25T..."
    },
    "accessToken": "eyJhbGc..."
  }
}
```

#### 2. **Login** (Authenticate User)
```
POST /v1/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "status": 200,
  "success": true,
  "message": "User logged in successfully!",
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc..."
  }
}
```
**Note**: Refresh token is set in `httpOnly` cookie.

#### 3. **Get Me** (Current User Profile)
```
GET /v1/api/auth/me
Authorization: Bearer <accessToken>
```

**Response (200)**
```json
{
  "status": 200,
  "success": true,
  "message": "User profile retrieved successfully!",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    ...
  }
}
```

#### 4. **Refresh Token**
```
POST /v1/api/auth/refresh
```

**Response (200)**
```json
{
  "status": 200,
  "success": true,
  "message": "Access token refreshed successfully!",
  "data": {
    "accessToken": "new_token"
  }
}
```

#### 5. **Logout**
```
POST /v1/api/auth/logout
Authorization: Bearer <accessToken>
```

---

## Post Module

### Base URL
```
/v1/api/posts
```

### Endpoints

#### 1. **Create Post**
```
POST /v1/api/posts
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "This is my first post!",
  "image": "https://example.com/image.jpg",
  "visibility": "public"  // public | friends | only_me
}
```

**Response (201)**
```json
{
  "status": 201,
  "success": true,
  "message": "Post created successfully!",
  "data": {
    "_id": "post_id",
    "author": {
      "_id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "username": "johndoe",
      "profilePicture": "..."
    },
    "content": "This is my first post!",
    "image": "https://...",
    "likes": [],
    "likeCount": 0,
    "comments": [],
    "commentCount": 0,
    "shares": 0,
    "visibility": "public",
    "createdAt": "2025-11-25T...",
    "updatedAt": "2025-11-25T..."
  }
}
```

#### 2. **Get All Posts** (Public Feed)
```
GET /v1/api/posts?page=1&limit=10&visibility=public
```

**Response (200)** - Paginated list with meta
```json
{
  "status": 200,
  "success": true,
  "message": "Posts retrieved successfully!",
  "meta": {
    "page": 1,
    "limit": 10,
    "totalData": 50,
    "totalPage": 5
  },
  "data": [...]
}
```

#### 3. **Get User Feed**
```
GET /v1/api/posts/feed/user?page=1&limit=10
Authorization: Bearer <accessToken>
```

**Response (200)** - User's own posts + public/friend posts

#### 4. **Get Single Post**
```
GET /v1/api/posts/:postId
```

#### 5. **Update Post**
```
PATCH /v1/api/posts/:postId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Updated content",
  "visibility": "friends"
}
```

#### 6. **Delete Post**
```
DELETE /v1/api/posts/:postId
Authorization: Bearer <accessToken>
```

#### 7. **Toggle Like on Post**
```
POST /v1/api/posts/:postId/like
Authorization: Bearer <accessToken>
```

**Response (200)**
```json
{
  "status": 200,
  "success": true,
  "message": "Post liked!",
  "data": {
    "liked": true,
    "likeCount": 5
  }
}
```

#### 8. **Get Post Likes**
```
GET /v1/api/posts/:postId/likes?page=1&limit=20
```

---

## Comment Module

### Base URL
```
/v1/api/comments
```

### Endpoints

#### 1. **Create Comment**
```
POST /v1/api/comments/post/:postId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Great post!",
  "parentComment": "comment_id"  // Optional: for replies
}
```

**Response (201)**

#### 2. **Get Post Comments** (Top-level only)
```
GET /v1/api/comments/post/:postId?page=1&limit=10
```

#### 3. **Get Comment Replies**
```
GET /v1/api/comments/:commentId/replies?page=1&limit=10
```

#### 4. **Get Single Comment**
```
GET /v1/api/comments/:commentId
```

#### 5. **Update Comment**
```
PATCH /v1/api/comments/:commentId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Updated comment text"
}
```

#### 6. **Delete Comment**
```
DELETE /v1/api/comments/:commentId
Authorization: Bearer <accessToken>
```

#### 7. **Toggle Like on Comment**
```
POST /v1/api/comments/:commentId/like
Authorization: Bearer <accessToken>
```

#### 8. **Get Comment Likes**
```
GET /v1/api/comments/:commentId/likes?page=1&limit=20
```

---

## Error Responses

All errors follow this format:

```json
{
  "status": 400,
  "success": false,
  "message": "Validation Error",
  "error": [
    {
      "path": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

### Common Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (permission denied)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Server Error

---

## Testing with Postman/cURL

### 1. Signup & Get Tokens
```bash
curl -X POST http://localhost:5000/v1/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "username": "testuser"
  }'
```

### 2. Create Post (Authenticated)
```bash
curl -X POST http://localhost:5000/v1/api/posts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello World!",
    "visibility": "public"
  }'
```

### 3. Like a Post
```bash
curl -X POST http://localhost:5000/v1/api/posts/POST_ID/like \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Notes

- Access tokens expire after time set in `.env` (`JWT_ACCESS_TOKEN_EXPIRES_IN`)
- Refresh tokens are stored in `httpOnly` cookies (secure by default)
- Post visibility: `public`, `friends`, or `only_me`
- Comments support nested replies via `parentComment` field
- Like counts are atomically updated with Mongoose `$inc` operator
- Pagination: default `page=1`, `limit=10` for posts, `limit=20` for likes

---

## Running the Server

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

Ensure `.env` file contains all required variables (see `.env.example`).
