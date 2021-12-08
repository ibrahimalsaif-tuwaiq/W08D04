# Social Media Website Backend

This is a backend for a social media website built in Express.

##  Entity Relationship Diagram

![ERD digram](https://github.com/ibrahimalsaif-tuwaiq/W08D04/blob/main/digrams/soical%20media%20ERD.jpg?raw=true)

## UML Diagram

![UML digram](https://github.com/ibrahimalsaif-tuwaiq/W08D04/blob/main/digrams/soical%20media%20backend%20UML.jpg?raw=true)

## Getting Started

### Installing Dependencies

#### Node js

Follow instructions to install the latest version of Node js for your platform in the [Node js docs](https://nodejs.org/en/).

#### NPM Dependencies

Once you have the project in your local machine, install dependencies by running:

```bash
npm install
```

This will install all of the required packages.

##### Key Dependencies

- [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.

- [morgan](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js.

- [bcrypt](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric).

#### Setting up the variables

You have to set up some variables in the `.env` file, for the app to run properly.

```
PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`
```

## Running the server

To run the server, execute:

```bash
npm run dev
```

For running the server in development mode, and execute:


```bash
npm run start
```

To run the server on production mode.

## API Reference

## Getting Started
Base URL: This application can be run locally on the http:/localhost:5000.

## Error Handling
Errors are returned as JSON objects depend on the error.

The API will return two error types when requests fail:

 - 400: Bad Request
 - 403: Forbidden
 - 404: Not Found

## Endpoints

### GET

#### GET /users
 - General
   - gets the list of all users
   - requires `admin` role

- Sample Request
   - `http://localhost:5000/users`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a74c1a99087f1a6c64a367",
    "email": "user@gmail.com",
    "username": "user",
    "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
    "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    "role": "61a7389f2c88f46ca3ec0987",
    "deleted": false,
    "__v": 0
  },
  {
    "_id": "61a751e390cc06dc96b2de65",
    "email": "admin@gmail.com",
    "username": "admin",
    "password": "$2b$10$otWRPRnY1J2/pQ2MnCWdbuRcDDa.w2cJzDgOwHAYbU/80FAOWJ3oW",
    "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    "role": "61a73a718b9b097feb669657",
    "deleted": false,
    "__v": 0
  }
]
```

</details>

#### GET /roles
 - General
   - gets the list of all the roles
   - requires `admin` role

- Sample Request
   - `http://localhost:5000/roles`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a7389f2c88f46ca3ec0987",
    "role": "user",
    "permissions": [
      "read"
    ],
    "__v": 0
  },
  {
    "_id": "61a73a718b9b097feb669657",
    "role": "admin",
    "permissions": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "__v": 0
  }
]
```

</details>

#### GET /posts
 - General
   - gets the list of all the posts for a user
   - requires `user` role

- Sample Request
   - `http://localhost:5000/posts`
   - Token

<details>
<summary>Response</summary>

```
[
  {
    "_id": "61a766183ccbb25aff8756ef",
    "description": "post 1",
    "createdBy": {
      "_id": "61a74c1a99087f1a6c64a367",
      "email": "user@gmail.com",
      "username": "user",
      "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
      "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      "role": "61a7389f2c88f46ca3ec0987",
      "deleted": false,
      "__v": 0
    },
    "deleted": false,
    "timestamp": "2021-12-01T12:10:00.283Z",
    "__v": 0
  },
  {
    "_id": "61a771ebb3f5b509471859a5",
    "description": "post 2",
    "createdBy": {
      "_id": "61a74c1a99087f1a6c64a367",
      "email": "user@gmail.com",
      "username": "user",
      "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
      "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      "role": "61a7389f2c88f46ca3ec0987",
      "deleted": false,
      "__v": 0
    },
    "deleted": false,
    "timestamp": "2021-12-01T13:00:27.422Z",
    "__v": 0
  },
  {
    "_id": "61a77d3d37c43a78d29dabc6",
    "description": "post 3",
    "createdBy": {
      "_id": "61a74c1a99087f1a6c64a367",
      "email": "user@gmail.com",
      "username": "user",
      "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
      "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      "role": "61a7389f2c88f46ca3ec0987",
      "deleted": false,
      "__v": 0
    },
    "deleted": false,
    "timestamp": "2021-12-01T13:48:45.801Z",
    "__v": 0
  }
]
```

</details>

#### GET /posts/{post_ID}
 - General
   - gets a posts for a user by ID
   - requires `user` role

- Sample Request
   - `http://localhost:5000/posts/61a771ebb3f5b509471859a5`
   - Token

<details>
<summary>Response</summary>

```
{
  "post": {
    "_id": "61a771ebb3f5b509471859a5",
    "description": "post 2",
    "createdBy": {
      "_id": "61a74c1a99087f1a6c64a367",
      "email": "user@gmail.com",
      "username": "user",
      "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
      "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      "role": "61a7389f2c88f46ca3ec0987",
      "deleted": false,
      "__v": 0
    },
    "deleted": false,
    "timestamp": "2021-12-01T13:00:27.422Z",
    "__v": 0
  },
  "comments": [
    {
      "_id": "61a77237b3f5b509471859a8",
      "description": "comment 1",
      "post": "61a771ebb3f5b509471859a5",
      "createdBy": {
        "_id": "61a74c1a99087f1a6c64a367",
        "email": "user@gmail.com",
        "username": "user",
        "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
        "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        "role": "61a7389f2c88f46ca3ec0987",
        "deleted": false,
        "__v": 0
      },
      "deleted": false,
      "timestamp": "2021-12-01T13:01:43.079Z",
      "__v": 0
    },
    {
      "_id": "61a7b5d17b2af9b4c9f2e053",
      "description": "comment 2",
      "post": "61a771ebb3f5b509471859a5",
      "createdBy": {
        "_id": "61a751e390cc06dc96b2de65",
        "email": "admin@gmail.com",
        "username": "admin",
        "password": "$2b$10$otWRPRnY1J2/pQ2MnCWdbuRcDDa.w2cJzDgOwHAYbU/80FAOWJ3oW",
        "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        "role": "61a73a718b9b097feb669657",
        "deleted": false,
        "__v": 0
      },
      "deleted": false,
      "timestamp": "2021-12-01T17:50:09.502Z",
      "__v": 0
    },
    {
      "_id": "61a7b60b7b2af9b4c9f2e05a",
      "description": "comment 3",
      "post": "61a771ebb3f5b509471859a5",
      "createdBy": {
        "_id": "61a751e390cc06dc96b2de65",
        "email": "admin@gmail.com",
        "username": "admin",
        "password": "$2b$10$otWRPRnY1J2/pQ2MnCWdbuRcDDa.w2cJzDgOwHAYbU/80FAOWJ3oW",
        "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        "role": "61a73a718b9b097feb669657",
        "deleted": false,
        "__v": 0
      },
      "deleted": false,
      "timestamp": "2021-12-01T17:51:07.967Z",
      "__v": 0
    }
  ],
  "likes": 1
}
```

</details>

### POST

#### POST /signup
 - General
   - creates a new user
 
 - Request Body 
   - email
   - username
   - password
   - role
   - avatar (optional)
 
 - Sample Request
   - `http://localhost:5000/signup`
   - Request Body
   
```
{
	"email": "user@gmail.com",
	"username": "user",
	"password": "12345",
	"role": "61a7389f2c88f46ca3ec0987"
}
```

<details>
<summary>Response</summary>

```
{
  "email": "user@gmail.com",
  "username": "user",
  "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
  "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  "role": "61a7389f2c88f46ca3ec0987",
  "deleted": false,
  "_id": "61a74c1a99087f1a6c64a367",
  "__v": 0
}
```
  
</details>

#### POST /login
 - General
   - login a user
 
 - Request Body 
   - email or usernaem
   - password
 
 - Sample Request
   - `http://localhost:5000/login`
   - Request Body
```
{
	"identifier": "user",
	"password": "12345"
}
```

<details>
<summary>Response</summary>

```
{
  "result": {
    "_id": "61a74c1a99087f1a6c64a367",
    "email": "user@gmail.com",
    "username": "user",
    "password": "$2b$10$WYtqc4pAzXJkFdmBoglOh.q30U4JILIqV5X6tExplCyz2Uw899eDm",
    "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    "role": {
      "_id": "61a7389f2c88f46ca3ec0987",
      "role": "user",
      "permissions": [
        "read"
      ],
      "__v": 0
    },
    "deleted": false,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTc0YzFhOTkwODdmMWE2YzY0YTM2NyIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImRlbGV0ZWQiOmZhbHNlLCJpYXQiOjE2MzgzNTUxMzQsImV4cCI6MTYzODM1ODczNH0.6kQNS6Re7T5-TVHlurGULSz4R_tg-RgP7dx63bZXsxU"
}
```
  
</details>

#### POST /createRole
 - General
   - creates a new role
   - requires `admin` role

 
 - Request Body
   - role
   - permissions
 
 - Sample Request
   - `http://localhost:5000/createRole`
   - Request Body
   - Token
   
```
{
    "role":"user",
    "permissions": ["read"]
}
```

<details>
<summary>Response</summary>

```
{
  "role": "user",
  "permissions": [
    "read"
  ],
  "_id": "61a7389f2c88f46ca3ec0987",
  "__v": 0
}
```
  
</details>

#### POST /posts
 - General
   - Add a new post to a user
   - requires `user` role

 
 - Request Body
   - image (optional)
   - description
 
 - Sample Request
   - `http://localhost:5000/posts`
   - Request Body
   - Token
   
```
{
	"description": "hello here is my first post"
}
```

<details>
<summary>Response</summary>

```
{
  "description": "hello here is my first post",
  "createdBy": "61a751e390cc06dc96b2de65",
  "deleted": false,
  "_id": "61a75cff9d12af263e2e1787",
  "timestamp": "2021-12-01T11:31:11.689Z",
  "__v": 0
}
```
  
</details>

#### POST /likePost/{post_ID}
 - General
   - Add a new like to a user post
   - requires `user` role

 
 - Request Body
   - like (true/false)
 
 - Sample Request
   - `http://localhost:5000/likePost/61a766183ccbb25aff8756ef`
   - Request Body
   - Token
   
```
{
	"like": true
}
```

<details>
<summary>Response</summary>

```
{
  "like": true,
  "post": "61a766183ccbb25aff8756ef",
  "createdBy": "61a74c1a99087f1a6c64a367",
  "_id": "61a7c32fefe26870a375da02",
  "timestamp": "2021-12-01T18:47:11.396Z",
  "__v": 0
}
```
  
</details>

#### POST /comments
 - General
   - Add a new comment to post for a user
   - requires `user` role

 
 - Request Body
   - description
   - postID
 
 - Sample Request
   - `http://localhost:5000/comments`
   - Request Body
   - Token
   
```
{
	"description": "my comment",
	"postID": "61a771ebb3f5b509471859a5"
}
```

<details>
<summary>Response</summary>

```
{
  "description": "my comment",
  "post": "61a771ebb3f5b509471859a5",
  "createdBy": "61a74c1a99087f1a6c64a367",
  "deleted": false,
  "_id": "61a77237b3f5b509471859a8",
  "timestamp": "2021-12-01T13:01:43.079Z",
  "__v": 0
}
```
  
</details>

### PUT

#### PUT /posts/{post_ID}
 - General
   - Update a post to a user
   - requires `user` role

 
 - Request Body
   - description (optional)
   - image (optional)
 
 - Sample Request
   - `http://localhost:5000/posts/61a75cff9d12af263e2e1787`
   - Request Body
   - Token
   
```
{
	"image": "http://mockimage.com",
	"description" : "edited description"
}
```

<details>
<summary>Response</summary>

```
{
  "_id": "61a75cff9d12af263e2e1787",
  "description": "edited description",
  "createdBy": "61a751e390cc06dc96b2de65",
  "deleted": false,
  "timestamp": "2021-12-01T11:31:11.689Z",
  "__v": 0,
  "image": "http://mockimage.com"
}
```
  
</details>

#### PUT /deletePost
 - General
   - delete a post to any user
   - requires `admin` role

 
 - Request Body
   - postID
   - creatorID
 
 - Sample Request
   - `http://localhost:5000/deletePost`
   - Request Body
   - Token
   
```
{
	"postID": "61a77d3d37c43a78d29dabc6",
	"creatorID": "61a74c1a99087f1a6c64a367"
}
```

<details>
<summary>Response</summary>

```
{
  "message": "The Post has been deleted successfully"
}
```
  
</details>

#### PUT /comments/{comment_ID}
 - General
   - Update a comment for a post
   - requires `user` role

 
 - Request Body
   - description
   - postID
 
 - Sample Request
   - `http://localhost:5000/todos/61a65f09d0179050d21ba396`
   - Request Body
   - Token
  
```
{
	"description": "this is a new comment",
	"postID": "61a771ebb3f5b509471859a5"
}
```

<details>
<summary>Response</summary>

```
{
  "_id": "61a77237b3f5b509471859a8",
  "description": "this is a new comment",
  "post": "61a771ebb3f5b509471859a5",
  "createdBy": "61a74c1a99087f1a6c64a367",
  "deleted": false,
  "timestamp": "2021-12-01T13:01:43.079Z",
  "__v": 0
}
```
  
</details>

#### PUT /commentDelete/{comment_ID}
 - General
   - delete a comment from a post to user, the user could be either comment creator or post creator 
   - requires `user` role

 
 - Request Body
   - postID
 
 - Sample Request
   - `http://localhost:5000/commentDelete/61a77237b3f5b509471859a8`
   - Request Body
   - Token
   
```
{
	"postID": "61a771ebb3f5b509471859a5"
}
```

<details>
<summary>Response</summary>

```
{
  "message": "The comment has been deleted successfully"
}
```
  
</details>

#### PUT /deleteComment
 - General
   - delete a comment from any post to any user
   - requires `admin` role

 
 - Request Body
   - postID
   - commentID
   - creatorID
 
 - Sample Request
   - `http://localhost:5000/deleteComment`
   - Request Body
   - Token
   
```
{
	"postID": "61a771ebb3f5b509471859a5",
	"commentID": "61a7b60b7b2af9b4c9f2e05a",
	"creatorID": "61a751e390cc06dc96b2de65"
}
```

<details>
<summary>Response</summary>

```
{
  "message": "The comment has been deleted successfully"
}
```
  
</details>

### DELETE

#### DELETE /posts/{post_ID}
 - General
   - Delete a post for a user
   - requires `user` role
 
 - Sample Request
   - `http://localhost:5000/posts/61a75cff9d12af263e2e1787`
   - Token

<details>
<summary>Response</summary>

```
{
  "message": "The Post has been deleted successfully"
}
```
  
</details>

#### DELETE /deleteAccount
 - General
   - Delete a user account
   - requires `user` role
 
 - Sample Request
   - `http://localhost:5000/deleteAccount`
   - Token

<details>
<summary>Response</summary>

```
{
  "message": "User has been deleted successfully"
}
```
  
</details>

#### DELETE /users/{user_ID}
 - General
   - Delete any user account
   - requires `admin` role
 
 - Sample Request
   - `http://localhost:5000/users/61a74c1a99087f1a6c64a367`
   - Token

<details>
<summary>Response</summary>

```
{
  "message": "User has been deleted successfully"
}
```
  
</details>
