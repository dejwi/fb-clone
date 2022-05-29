# Dejwibook
FullStack project: React, Express with authorization, live-time chat | more ↓
### [live demo](dejwibook.vercel.app)
### Preview
![lawst](https://user-images.githubusercontent.com/80927085/170881641-8c4f7de5-20b8-489c-be70-5233d5cef5d1.gif)


### Features & Info
- Nice animations😌
  - /w framer-motion
- Backend authorization
  - Google & Facebook signup options
  - managed with jwt (jsonwebtoken)
- Posts
  - create & delete & comment & like
- Live-time chat with your friends!!
  - implemented with socket.io
- Friends
  - invite & accept & remove
- Editing profile
  - Username & profile picture & background picture
- Styling /w Tailwindcss
- Typescript
- MongoDB to store data
- AWS s3 bucket to store images
- Main pages
  - Feed - latest posts
  - Friends Feed
  - Friends & accept invites
  - Discover new friends
  - Profile pages

### How to run localy
- install dependencies at /api & /frontend
- NOTE: def means it's a default host url on run start
- NOTE: you can go without AWS just delete its usage from api controllers and routes
- both npm run start
<p>&nbsp;</p>
/api .env

| |  | |
--- | --- | ---|
|DB_URI|MongoDB uri||
|SECRET|secret||
|FRONTEND_URL|url to your hosted frontend|ex. https://localhost:3001 (def)|
|ORG_URL|url to your hosted backend yes it's needed|ex. http://localhost:3000 (def)|
|AWS_ACCESS_KEY|s3 bucket||
|AWS_SECRET_KEY|s3 bucket||
|AWS_BUCKET_NAME|s3 bucket||
|FB_ID|Facebook App ID|auth|
|FB_SECRET|Facebook App secret||
|GOOGLE_ID|Goole Client ID||
|GOOGLE_SECRET|Google Client ID||
<p>&nbsp;</p>
/frontend .env

| |  | |
--- | --- | ---|
|REACT_APP_BACKEND|url to your hosted backend|ex. http://localhost:3000 (def)|


