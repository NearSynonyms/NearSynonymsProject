# Server API\

\
This repository provides an API that serves tutorial and game sentences based on user information stored in a DynamoDB table. It allows the retrieval of tutorial sentences, game sentences based on user difficulty, and handles user creation and updates. The application interacts with AWS S3 for storing and retrieving sentence data in Excel files and AWS DynamoDB for managing user data.\
\

## Table of Contents\

\

- [Technologies](#technologies)\
- [Installation](#installation)\
- [AWS Setup](#aws-setup)\
- [Endpoints](#endpoints)\
  - [GetTutorialSentences](#gettutorialsentences)\
  - [GetSentences](#getsentences)\
  - [GetOrCreateUser](#getorcreateuser)\
  - [UpdateUserDetails](#updateuserdetails)\
- [Project Structure](#project-structure)\
- [Error Handling](#error-handling)\
- [License](#license)\
  \

## Technologies\

\

- Node.js\
- Express.js\
- AWS SDK (DynamoDB, S3)\
- Multer (for file uploads)\
- XLSX (for reading Excel files)\
- UUID (for generating unique IDs)\
- Body-parser (for parsing request bodies)\
  \

## Installation\

\

1. Clone this repository:\
   ````bash\
   git clone https://github.com/NearSynonymsProject/Server/server-api.git\
   ```\
   ````
2. Navigate into the project directory:\
   ````bash\
   cd server-api\
   ```\
   ````
3. Install the dependencies:\
   ````bash\
   npm install\
   ```\
   ````
4. Create the required directories for storing images:\
    `bash\
    mkdir users_images\
    `\
   \

## AWS Setup\

\

### S3 Setup\

\

1. Create an S3 bucket for storing Excel files. Replace the `S3_BUCKET` constant in the code with the name of your S3 bucket.\
   \
2. Upload the following Excel files to your S3 bucket:\
   - `tutorial_sentences.xlsx`\
   - `easy_sentences.xlsx`\
   - `medium_sentences.xlsx`\
   - `hard_sentences.xlsx`\
     \

### DynamoDB Setup\

\

1. Create a DynamoDB table called `DB-users-data` with the following attributes:\
   - Primary Key: `user_id` (String)\
   - Global Secondary Index: `token-index` with `token` as the partition key.\
     \
2. Make sure to replace the `DYNAMODB_TABLE` constant in the code with the name of your DynamoDB table.\
   \

## Endpoints\

\

### 1. **GetTutorialSentences**\

\
Retrieve tutorial sentences based on the user\'92s `tutorial_sentences_index` and increment the index after each request.\
\
**URL:** `/GetTutorialSentences`\
\
**Method:** `GET`\
\
**Query Parameters:**\

- `token` (required): User token.\
  \
  **Response:**\

````json\
\{\
  "first_word": "example",\
  "first_sentence": "This is the first example sentence.",\
  "second_word": "sample",\
  "second_sentence": "This is the second example sentence.",\
  "partial_sentence": "This is a partial sentence",\
  "sentence": "Complete the sentence.",\
  "correct_word": "example"\
\}\
```\
\
### 2. **GetSentences**\
\
Retrieve 10 game sentences based on the user\'92s difficulty level (easy, medium, or hard).\
\
**URL:** `/GetSentences`\
\
**Method:** `GET`\
\
**Query Parameters:**\
- `token` (required): User token.\
\
**Response:**\
```json\
[\
  \{\
    "partial_sentence": "This is a partial sentence.",\
    "first_word": "example",\
    "second_word": "sample",\
    "correct_word": "example",\
    "sentence": "Complete the sentence."\
  \},\
  ...\
]\
```\
\
### 3. **GetOrCreateUser**\
\
Retrieve user details or create a new user if the token is not associated with an existing user.\
\
**URL:** `/GetOrCreateUser`\
\
**Method:** `GET`\
\
**Query Parameters:**\
- `token` (required): User token.\
\
**Response:**\
```json\
\{\
  "difficulty": 1,\
  "picture": null\
\}\
```\
\
### 4. **UpdateUserDetails**\
\
Update the user\'92s difficulty and optionally upload a profile picture.\
\
**URL:** `/UpdateUserDetails`\
\
**Method:** `PUT`\
\
**Body Parameters:**\
- `token` (required): User token.\
- `difficulty` (required): User difficulty level (1, 2, or 3).\
- `picture` (optional): Profile picture (file).\
\
**Response:**\
```json\
\{\
  "message": "User details updated successfully."\
\}\
```\
\
## Project Structure\
\
```\
\uc0\u9500 \u9472 \u9472  users_images/            # Directory for storing uploaded images\
\uc0\u9500 \u9472 \u9472  app.js                   # Main API logic\
\uc0\u9500 \u9472 \u9472  package.json             # Project dependencies\
\uc0\u9492 \u9472 \u9472  README.md                # Documentation\
```\
\
## Error Handling\
\
The application uses a centralized error handling mechanism. If any error occurs, the API will return a response with an appropriate HTTP status code and an error message.\
\
## License\
\
This project is licensed under the MIT License. You can use this project freely, but at your own risk.\
\
---\
\
````
