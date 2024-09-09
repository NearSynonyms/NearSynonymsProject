import axios from "axios";
import { sentences, guideSentence, gameHistory } from "./dummydata";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 6000,
    });
  }

  // GET: Retrieve image and level of user
  async getUserState(userId) {
    try {
      const response = await this.api.get(`/GetOrCreateUser/?token=${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  // GET: Retrieve user history
  async getUserHistory(userId) {
    try {
      const response = await this.api.get(
        `/GetUserGameStatistics/?token=${userId}`
      );
      return response.data;
    } catch (error) {
      return gameHistory;
    }
  }
  // POST: update user history
  async updateUserHistory(userId, difficulty, date, time, correctAnswer) {
    try {
      const response = await this.api.post(
        "/SaveUserGameStatistics",
        {
          token: userId,
          date: date,
          time: time,
          difficulty: difficulty,
          correct_answers: correctAnswer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // GET: Retrieve an array of 10 objects based on user's difficulty level
  async getSentences(userId) {
    try {
      const response = await this.api.get(`/GetSentences/?token=${userId}`);
      return response.data;
    } catch (error) {
      return sentences;
    }
  }
  // GET: Retrieve an sentence for the tutorial section
  async getTutorialSentence(userId) {
    try {
      const response = await this.api.get(
        `/GetTutorialSentences/?token=${userId}`
      );
      return response.data;
    } catch (error) {
      return guideSentence;
    }
  }
  // PUT: Update user's image and difficulty level
  async updateUserProfile(formData) {
    try {
      const response = await this.api.put("/UpdateUserDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(
      "API call error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

const apiService = new ApiService("http://3.236.156.67:3000");
export default apiService;
