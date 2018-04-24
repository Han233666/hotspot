import { AsyncStorage } from "react-native";
let key = require('./Config').key;

export const USER_KEY = key;

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
          if (res !== null) {
              resolve(true);
          } else {
              resolve(false);
          }
      })
      .catch(err => reject(err));
  });
};