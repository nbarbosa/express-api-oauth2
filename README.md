# Express Web API & oAuth2 Node.js Back-end
A back-end API built with [express](https://github.com/strongloop/express) and [oauth2-server](https://github.com/thomseddon/node-oauth2-server). It can be used as the foundation for that mobile app's back-end of yours.
## Install & Run
    npm install
    node seed.js
    npm start
## Environment Variables
* APP_CLIENT_ID - oAuth2 App Client ID
* APP_CLIENT_SECRET - oAuth2 App Client Secret
* MONGO_URI

## Endpoints
#### Add a new user
    POST /users HTTP/1.1
    Content-Type: application/json

    { name: { first: "John", last: "Doe" }, email: "john.doe@example.org", password: "a very strong password" }
#### Get a new token from username + password
    POST /token HTTP/1.1
    Authorization: Basic APP_CLIENT_ID:APP_CLIENT_SECRET Base64'd
    Content-Type: application/x-www-form-urlencoded
    
    username=john.doe@example.org&password=a%20very%20strong%20password&grant_type=password
#### Get user's info (restricted endpoint)
    GET /users/me?access_token=VALID_TOKEN_FOR_USER HTTP/1.1
#### Get a new token from a valid Refresh Token
    POST /token HTTP/1.1
    Authorization: Basic APP_CLIENT_ID:APP_CLIENT_SECRET Base64'd
    Content-Type: application/x-www-form-urlencoded
    Cache-Control: no-cache
    
    refresh_token=REFRESH_TOKEN_HERE&grant_type=refresh_token
## License
    Copyright 2015 Natã Barbosa.
    
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.