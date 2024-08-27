// sounds/SoundManager.js
import { Audio } from "expo-av";

export const sounds = {
  homeBackground: require("./settingsAndHomeScreenSound.mp3"),
  buttonClick: require("./buttonClicked.mp3"),
  correctAnswer: require("./correctAnswer.mp3"),
  incorrectAnswer: require("./incorrectAnswer.mp3"),
  win: require("./WinSound.mp3"),
  lose: require("./failSound.mp3"),
  gameBackground: require("./gameScreenSound.mp3"),
  popup: require("./popupSound.mp3"),
  tutorialBackground: require("./tutorialBackground.mp3"),
};
let backgroundMusic;

export const playSoundEffect = async (sound) => {
  const { sound: soundObject } = await Audio.Sound.createAsync(sound);
  await soundObject.playAsync();
};

export const playBackgroundMusic = async (sound) => {
  if (backgroundMusic) {
    await backgroundMusic.unloadAsync();
  }
  const { sound: newSound } = await Audio.Sound.createAsync(sound);
  backgroundMusic = newSound;
  await backgroundMusic.setVolumeAsync(0.7);
  await backgroundMusic.setIsLoopingAsync(true);
  await backgroundMusic.playAsync();
};

export const stopBackgroundMusic = async () => {
  if (backgroundMusic) {
    await backgroundMusic.stopAsync();
    await backgroundMusic.unloadAsync();
    backgroundMusic = null;
  }
};
export const setBackgroundMusicVolume = async (volume) => {
  if (backgroundMusic) {
    await backgroundMusic.setVolumeAsync(volume);
  }
};
