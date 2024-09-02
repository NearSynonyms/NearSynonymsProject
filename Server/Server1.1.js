const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/users_images", express.static("users_images"));

// Set the AWS region
AWS.config.update({ region: "us-east-1" }); // Replace 'your-region' with your AWS region, e.g., 'us-east-1'

// Now continue with your AWS operations

// S3 Configuration
const S3_BUCKET = "bucket-sentences"; // Replace 'your-s3-bucket-name' with your actual S3 bucket name

const s3 = new AWS.S3();

// DynamoDB Configuration
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DYNAMODB_TABLE = "DB-users-data"; // Replace 'your-dynamodb-table-name' with your actual DynamoDB table name

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const multer = require("multer");
const path = require("path");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "users_images/"); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Function to load data from S3 and parse the Excel file
const loadDataFromS3 = async (fileName) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };
  try {
    const data = await s3.getObject(params).promise();
    const workbook = XLSX.read(data.Body, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  } catch (err) {
    console.error("Error retrieving file from S3:", err);
    throw err;
  }
};

app.get(
  "/GetTutorialSentences",
  asyncHandler(async (req, res) => {
    const { token } = req.query;

    // Log incoming request
    console.log("Received GET request for tutorial sentences.");
    console.log("User Token:", token);

    if (!token) {
      console.log("Error: Token is required");
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      // Retrieve the user from the DynamoDB table using the token
      const getUserParams = {
        TableName: DYNAMODB_TABLE,
        IndexName: "token-index",
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: { "#token": "token" },
        ExpressionAttributeValues: { ":token": token },
      };

      const {
        Items: [user],
      } = await dynamodb.query(getUserParams).promise();

      // Log the retrieved user
      console.log("Retrieved User:", user);

      // If user doesn't exist, return an error message
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ error: "User not exist" });
      }

      const startIndex = user.tutorial_sentences_index || 0;

      // Load tutorial sentences data from the S3 bucket file
      const sentencesFile = "tutorial_sentences.xlsx";
      const sentencesData = await loadDataFromS3(sentencesFile);
      console.log(`Loaded tutorial sentences data from ${sentencesFile}.`);

      // Handle the wrapping around if startIndex exceeds the length of sentencesData
      const currentIndex = startIndex % sentencesData.length;
      const sentenceObject = sentencesData[currentIndex];

      const responseObject = {
        first_word: sentenceObject.first_word,
        first_sentence: sentenceObject.first_sentence,
        second_word: sentenceObject.second_word,
        second_sentence: sentenceObject.second_sentence,
        partial_sentence: sentenceObject.partial_sentence,
        sentence: sentenceObject.sentence,
        correct_word: sentenceObject.correct_word,
      };

      // Log the response object
      console.log("Tutorial Sentences Object:", responseObject);

      // Update the user's tutorial_sentences_index in the DynamoDB table
      const updatedIndex = (currentIndex + 1) % sentencesData.length;
      console.log("Updated tutorial_sentences_index:", updatedIndex);

      const updateUserParams = {
        TableName: DYNAMODB_TABLE,
        Key: { user_id: user.user_id },
        UpdateExpression: "SET tutorial_sentences_index = :index",
        ExpressionAttributeValues: { ":index": updatedIndex },
      };

      // Log the update parameters
      console.log(
        "DynamoDB Update Parameters:",
        JSON.stringify(updateUserParams, null, 2)
      );

      await dynamodb.update(updateUserParams).promise();

      console.log(
        "Tutorial sentences sent successfully and user index updated."
      );
      res.json(responseObject);
    } catch (error) {
      console.error("Error retrieving tutorial sentences:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while retrieving tutorial sentences",
        });
    }
  })
);

/// extract the difficulty from the db and sendsentences based on that, i get only token
//// I GET INPUT ALSO FLAG THAT SAYS if we need guide sentences or sentences from the game guideFlag, if true send guide setneces
app.get(
  "/GetSentences",
  asyncHandler(async (req, res) => {
    const { token } = req.query;

    // Check if the token exist
    if (!token) {
      console.log("Error: Token is required");
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      console.log("Received GET request for sentences.");
      console.log("User Token:", token);

      // Retrieve the user from the DynamoDB table using the token
      const getUserParams = {
        TableName: DYNAMODB_TABLE,
        IndexName: "token-index",
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: { "#token": "token" },
        ExpressionAttributeValues: { ":token": token },
      };

      const {
        Items: [user],
      } = await dynamodb.query(getUserParams).promise();

      // Log the retrieved user
      console.log("Retrieved User:", user);

      // If user doesn't exist, return an error message
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ error: "User not exist" });
      }

      let sentencesFile, startIndex;

      const difficulty = Number(user.difficulty);
      console.log("Difficulty Level:", user.difficulty);

      // Determine the file based on the user's difficulty level
      console.log("Difficulty Level (Enum):", difficulty);

      switch (difficulty) {
        case 1:
          sentencesFile = "easy_sentences.xlsx";
          startIndex = user.easy_sentences_index;
          break;
        case 2:
          sentencesFile = "medium_sentences.xlsx";
          startIndex = user.medium_sentences_index;
          break;
        case 3:
          sentencesFile = "hard_sentences.xlsx";
          startIndex = user.hard_sentences_index;
          break;
        default:
          console.log("Invalid difficulty level.");
          return res.status(400).json({ error: "Invalid difficulty level" });
      }

      // Log the selected file and starting index
      console.log("Selected Sentences File:", sentencesFile);
      console.log("Start Index:", startIndex);

      // Load sentences data from the appropriate S3 bucket file
      const sentencesData = await loadDataFromS3(sentencesFile);
      console.log(`Loaded sentences data from ${sentencesFile}.`);

      const sentencesObjects = [];

      // Handle wrapping around if endIndex exceeds the length of sentencesData
      for (let i = 0; i < 10; i++) {
        const currentIndex = (startIndex + i) % sentencesData.length;
        const sentenceObject = sentencesData[currentIndex];
        sentencesObjects.push({
          partial_sentence: sentenceObject.partial_sentence,
          first_word: sentenceObject.first_word,
          second_word: sentenceObject.second_word,
          correct_word: sentenceObject.correct_word,
          sentence: sentenceObject.sentence,
        });
      }

      // Log the sentences objects
      console.log("Sentences Objects:", sentencesObjects);

      // Update the user's index in the DynamoDB table
      const updatedIndex = (startIndex + 10) % sentencesData.length;
      console.log("updated index:", updatedIndex);
      const updateUserParams = {
        TableName: DYNAMODB_TABLE,
        Key: { user_id: user.user_id },
        UpdateExpression: `SET ${
          difficulty === 1
            ? "easy_sentences_index"
            : difficulty === 2
            ? "medium_sentences_index"
            : "hard_sentences_index"
        } = :index`,
        ExpressionAttributeValues: { ":index": updatedIndex },
      };

      // Log the update parameters
      console.log(
        "DynamoDB Update Parameters:",
        JSON.stringify(updateUserParams, null, 2)
      );

      await dynamodb.update(updateUserParams).promise();

      console.log("Sentences sent successfully and user index updated.");
      res.json(sentencesObjects);
    } catch (error) {
      console.error("Error retrieving sentences:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving sentences" });
    }
  })
);

app.get(
  "/GetOrCreateUser",
  asyncHandler(async (req, res) => {
    const { token } = req.query;

    // Log incoming request
    console.log("Received GET request to /GetUserDetails.");
    console.log("Request Query:", req.query);

    if (!token) {
      console.log("Error: Token is required");
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      const getUserParams = {
        TableName: DYNAMODB_TABLE,
        IndexName: "token-index",
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: { "#token": "token" },
        ExpressionAttributeValues: { ":token": token },
      };

      console.log("DynamoDB Query Parameters:", getUserParams);

      const {
        Items: [user],
      } = await dynamodb.query(getUserParams).promise();

      console.log("DynamoDB Query Result:", user);

      if (!user) {
        const newUser = {
          user_id: uuidv4(),
          token: token,
          picture: null,
          difficulty: 1,
          easy_sentences_index: 0,
          medium_sentences_index: 0,
          hard_sentences_index: 0,
          guide_sentences_index: 0,
        };

        const putUserParams = {
          TableName: DYNAMODB_TABLE,
          Item: newUser,
        };
        await dynamodb.put(putUserParams).promise();

        console.log("Created new user:", newUser);

        return res.json({
          difficulty: -1,
          picture: null,
        });
      }

      // Extract user details
      const { difficulty, picture } = user;
      const pictureUrl = picture
        ? `${req.protocol}://${req.get("host")}/${picture}`
        : null;

      console.log("User details:", { difficulty: difficulty, pictureUrl });

      // Return user details
      res.json({
        difficulty: difficulty,
        picture: pictureUrl,
      });
    } catch (error) {
      console.error("Error retrieving or creating user details:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while retrieving or creating user details",
        });
    }
  })
);

// Endpoint to update user details based on token
app.put(
  "/UpdateUserDetails",
  upload.single("picture"),
  asyncHandler(async (req, res) => {
    const { token, difficulty } = req.body;
    const picture = req.file;

    console.log("Received PUT request to /UpdateUserDetails.");
    console.log("Request Body:", req.body);

    if (!token) {
      console.log("Error: Token is required");
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      // Query the user by token using the GSI
      const getUserParams = {
        TableName: DYNAMODB_TABLE,
        IndexName: "token-index",
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: { "#token": "token" },
        ExpressionAttributeValues: { ":token": token },
      };

      console.log("DynamoDB Query Parameters:", getUserParams);

      const result = await dynamodb.query(getUserParams).promise();

      console.log("DynamoDB Query Result:", result);

      if (result.Items.length === 0) {
        console.log("Error: User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const user = result.Items[0];
      const userDifficulty = Number(difficulty);

      // Delete the old picture if it exists and is different from the new picture
      if (picture && user.picture && user.picture !== picture.path) {
        const oldPicturePath = path.join(
          "users_images",
          path.basename(user.picture)
        );
        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath);
          console.log("Deleted old picture:", oldPicturePath);
        }
      }

      // Update the user's details
      const updateParams = {
        TableName: DYNAMODB_TABLE,
        Key: {
          user_id: user.user_id,
        },
        UpdateExpression: "SET picture = :picture, difficulty = :difficulty",
        ExpressionAttributeValues: {
          ":picture": picture ? picture.path : user.picture, // Save the file path
          ":difficulty": userDifficulty,
        },
        ReturnValues: "UPDATED_NEW",
      };

      console.log("DynamoDB Update Parameters:", updateParams);

      const updateResult = await dynamodb.update(updateParams).promise();

      console.log("DynamoDB Update Result:", updateResult);

      res.json({
        message: "User updated successfully",
        updatedAttributes: updateResult.Attributes,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  })
);

// Endpoint to save user game statistics
app.post(
  "/SaveUserGameStatistics",
  asyncHandler(async (req, res) => {
    const { token, date, time, difficulty, correct_answers } = req.body;

    // Log incoming request
    console.log("Received POST request to /SaveUserGameStatistics.");
    console.log("Request Body:", req.body);

    // Basic validation to check for null or undefined values
    if (
      !token ||
      !date ||
      !time ||
      difficulty == undefined ||
      correct_answers == undefined
    ) {
      console.log(
        "Validation Error: One or more fields are null or undefined."
      );
      return res
        .status(400)
        .json({
          error: "All fields must be provided and not be null or undefined",
        });
    }

    try {
      // Create new game statistics object
      const newGameStats = {
        game_id: uuidv4(),
        token: token,
        date: date,
        time: time,
        difficulty: difficulty,
        correct_answers: correct_answers,
      };

      // Log the new game stats to be saved
      console.log("New Game Statistics:", newGameStats);

      // Prepare parameters for DynamoDB put operation
      const putParams = {
        TableName: "Game-Statistics",
        Item: newGameStats,
      };

      // Save to DynamoDB
      await dynamodb.put(putParams).promise();

      // Log success message
      console.log("Game statistics saved successfully.");

      res.status(200).json({ message: "Game statistics saved successfully" });
    } catch (error) {
      // Log the error
      console.error("Error saving game statistics:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving game statistics" });
    }
  })
);

// Endpoint to get user game statistics
app.get(
  "/GetUserGameStatistics",
  asyncHandler(async (req, res) => {
    const { token } = req.query;

    // Log incoming request
    console.log("Received GET request to /GetUserGameStatistics.");
    console.log("Request Query:", req.query);

    // Validate token
    if (!token) {
      console.log("Error: Token is required");
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      // Prepare parameters for DynamoDB query
      const queryParams = {
        TableName: "Game-Statistics",
        IndexName: "token-index", // Optional: if you create a secondary index for token
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: {
          "#token": "token",
          "#date": "date",
          "#time": "time",
          "#difficulty": "difficulty",
          "#correct_answers": "correct_answers",
        },
        ExpressionAttributeValues: {
          ":token": token,
        },
        ProjectionExpression:
          "#token, #date, #time, #difficulty, #correct_answers",
      };

      // Log query parameters
      console.log("DynamoDB Query Parameters:", queryParams);

      // Query DynamoDB
      const { Items } = await dynamodb.query(queryParams).promise();

      // Sort the items by date and time
      const sortedItems = sortItemsByDateTime(Items);

      // Log the retrieved items
      console.log("Game Statistics Retrieved:", sortedItems);

      res.status(200).json(sortedItems);
    } catch (error) {
      // Log the error
      console.error("Error retrieving game statistics:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving game statistics" });
    }
  })
);

// Method to sort items by date and time
function sortItemsByDateTime(items) {
  return items.sort((a, b) => {
    // Split the date strings into day, month, and year components
    const [dayA, monthA, yearA] = a.date.split("/").map(Number);
    const [dayB, monthB, yearB] = b.date.split("/").map(Number);

    // Compare by year
    if (yearA !== yearB) {
      return yearB - yearA; // Descending order by year
    }

    // If years are the same, compare by month
    if (monthA !== monthB) {
      return monthB - monthA; // Descending order by month
    }

    // If months are the same, compare by day
    if (dayA !== dayB) {
      return dayB - dayA; // Descending order by day
    }

    // If dates are the same, compare by time (hour and minute)
    const [hourA, minuteA] = a.time.split(":").map(Number);
    const [hourB, minuteB] = b.time.split(":").map(Number);

    if (hourA !== hourB) {
      return hourB - hourA; // Descending order by hour
    }

    // If hours are the same, compare by minute
    return minuteB - minuteA; // Descending order by minute
  });
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
