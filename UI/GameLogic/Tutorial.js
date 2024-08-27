import apiService from "../API/ApiService";
class Tutorial {
  constructor(user) {
    this.userId = user.id;
    this.sentencesArray = [];
    this.currentIndex = 0;
  }

  async init() {
    const sentence = await apiService.getTutorialSentence(this.userId);
    if (sentence) {
      this.sentencesArray = [sentence];
      this.sentencesArray = this.sentencesArray.map((sentence) => {
        if (Math.random() > 0.5) {
          return {
            ...sentence,
            first_word: sentence.second_word,
            first_sentence: sentence.second_sentence,
            second_word: sentence.first_word,
            second_sentence: sentence.first_sentence,
          };
        } else {
          return sentence;
        }
      });
    } else {
      console.error("Failed to fetch tutorial sentence.");
    }
  }

  getQuestion() {
    return this.sentencesArray.length > 0 ? this.sentencesArray[0] : null;
  }
}
export default Tutorial;
