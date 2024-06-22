const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Set the AWS region
AWS.config.update({ region: 'us-east-1' }); 



// S3 Configuration
const S3_BUCKET = 'bucket-sentences'; 
const EXCEL_FILE = 'Sentences.xlsx'; 

const s3 = new AWS.S3();

// DynamoDB Configuration
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DYNAMODB_TABLE = 'users_data'; 

// Global index to keep track of the current row
let globalIndex = 0;
const rowsPerPage = 10;

// Middleware for error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Function to load data from S3 and parse the Excel file
const loadDataFromS3 = async () => {
    const params = {
        Bucket: S3_BUCKET,
        Key: EXCEL_FILE,
    };
    try {
        const data = await s3.getObject(params).promise();
        const workbook = XLSX.read(data.Body, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet);
    } catch (err) {
        console.error('Error retrieving file from S3:', err);
        throw err;
    }
};

// Endpoint to get sentences based on user progress level
app.get('/sentences', asyncHandler(async (req, res) => {
    const { user_id } = req.query;

    try {
        console.log('Received GET request for sentences.');
        console.log('User ID:', user_id);

        const userID = parseInt(user_id, 10);
        // Get the user from the DynamoDB table
        const getUserParams = {
            TableName: DYNAMODB_TABLE,
            Key: { user_id: userID },
        };
        const { Item: user } = await dynamodb.get(getUserParams).promise();

        console.log('getUserParams:', getUserParams); // Log the getUserParams object

        // If user doesn't exist, return error message
        if (!user) {
            console.log('User not found.');
            return res.status(404).json({ error: 'User not found' });
        }

        const { progress_level } = user;
        console.log('User progress level:', progress_level);

        // Load sentences data from S3 bucket
        const sentencesData = await loadDataFromS3();
        console.log('Loaded sentences data from S3.');

        // Calculate the start index based on the user's progress level
        const startIndex = progress_level * 10;
        // Calculate the end index
        let endIndex = startIndex + 10;

        const sentencesObjects = [];

        // Handle wrapping around if endIndex exceeds the length of sentencesData
        if (endIndex > sentencesData.length) {
            // Add sentences from startIndex to the end of the array
            for (let i = startIndex; i < sentencesData.length; i++) {
                const sentenceObject = sentencesData[i];
                const correctWord = parseFloat(sentenceObject.preplexity_first_word) > parseFloat(sentenceObject.preplexity_second_word) ? sentenceObject.first_word : sentenceObject.second_word;
                sentencesObjects.push({
                    sentence: sentenceObject.sentence,
                    first_word: sentenceObject.first_word,
                    second_word: sentenceObject.second_word,
                    correct_word: correctWord
                });
            }
            // Calculate remaining number of sentences to fetch from the start
            const remaining = endIndex % sentencesData.length;
            // Add sentences from the beginning of the array to the remaining count
            for (let i = 0; i < remaining; i++) {
                const sentenceObject = sentencesData[i];
                const correctWord = parseFloat(sentenceObject.preplexity_first_word) > parseFloat(sentenceObject.preplexity_second_word) ? sentenceObject.first_word : sentenceObject.second_word;
                sentencesObjects.push({
                    sentence: sentenceObject.sentence,
                    first_word: sentenceObject.first_word,
                    second_word: sentenceObject.second_word,
                    correct_word: correctWord
                });
            }
        } else {
            // If endIndex is within the bounds, add sentences from startIndex to endIndex
            for (let i = startIndex; i < endIndex; i++) {
                const sentenceObject = sentencesData[i];
                const correctWord = parseFloat(sentenceObject.preplexity_first_word) > parseFloat(sentenceObject.preplexity_second_word) ? sentenceObject.first_word : sentenceObject.second_word;
                sentencesObjects.push({
                    sentence: sentenceObject.sentence,
                    first_word: sentenceObject.first_word,
                    second_word: sentenceObject.second_word,
                    correct_word: correctWord
                });
            }
        }

        console.log('Sentences sent successfully.');
        res.json(sentencesObjects);
    } catch (error) {
        console.error('Error retrieving sentences:', error);
        res.status(500).json({ error: 'An error occurred while retrieving sentences' });
    }
}));



// Endpoint to add a user
app.post('/add_user', asyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
        return res.status(400).json({ error: 'First name and last name are required' });
    }

    try {
        // Get the count of existing users to determine the new user_id
        const countParams = {
            TableName: DYNAMODB_TABLE,
            Select: 'COUNT',
        };
        const { Count: userCount } = await dynamodb.scan(countParams).promise();

        // Create a new user object
        const newUser = {
            user_id: userCount + 1, // Increment the user_id
            first_name: first_name,
            last_name: last_name,
            progress_level: 0, // Set progress_level to 0
        };

        // Put the new user into the DynamoDB table
        const putUserParams = {
            TableName: DYNAMODB_TABLE,
            Item: newUser,
        };
        await dynamodb.put(putUserParams).promise();

        res.json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user' });
    }
}));


// Endpoint to update user progress
app.put('/update_user', asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    console.log('userId: ' , user_id);

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Get the user from the DynamoDB table
        const getUserParams = {
            TableName: DYNAMODB_TABLE,
            Key: { user_id: user_id },
        };
        const { Item: user } = await dynamodb.get(getUserParams).promise();

        // If user doesn't exist, return error message
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Increment the progress_level by 1
        const updatedProgressLevel = user.progress_level + 1;

        // Update the user's progress_level in the DynamoDB table
        const updateUserParams = {
            TableName: DYNAMODB_TABLE,
            Key: { user_id: user_id },
            UpdateExpression: 'SET progress_level = :progress',
            ExpressionAttributeValues: { ':progress': updatedProgressLevel },
        };
        await dynamodb.update(updateUserParams).promise();

        res.json({ message: 'User progress updated successfully', user: { ...user, progress_level: updatedProgressLevel } });
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ error: 'An error occurred while updating user progress' });
    }
}));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
