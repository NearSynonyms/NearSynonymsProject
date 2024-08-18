import axios from "axios";
import { sentences } from "./dummydata";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // GET: Retrieve image and level of user
  async getUserState(userId) {
    try {
      const response = await this.api.get(`/GetUserDetails/?token=${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // GET: Retrieve an array of 10 objects based on user's difficulty level
  async getSentences(userId, guideFlag) {
    try {
      const response = await this.api.get(
        `/GetSentences/?token=${userId}&guideFlag=${guideFlag}`
      );
      return response.data;
    } catch (error) {
      console.log("ok");
      return sentences;
      //this.handleError(error);
    }
  }

  // POST: Update user's image and difficulty level
  async updateUserProfile(userId, image, level) {
    try {
      const response = await this.api.post(`/UpdateDetails`, {
        userId,
        image,
        level,
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

const apiService = new ApiService("https://api.yourservice.com");
export default apiService;
