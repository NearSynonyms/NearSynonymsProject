import ApiService from "../API/ApiService";
class Gameplay {
  constructor(user) {
    this.userId = user.id;
    this.sentencesArray = [];
    this.currentIndex = 0;
  }

  async init() {
    this.sentencesArray = await ApiService.getSentences(this.userId, "false");
    this.sentencesArray = this.sentencesArray.map((sentence) => {
      if (Math.random() > 0.5) {
        return {
          ...sentence,
          first_word: sentence.second_word,
          second_word: sentence.first_word,
        };
      } else {
        return sentence;
      }
    });
  }

  getCurrentQuestion() {
    return this.sentencesArray[this.currentIndex];
  }

  incrementIndex() {
    this.currentIndex += 1;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}

export default Gameplay;
