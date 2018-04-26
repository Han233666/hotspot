import { AsyncStorage } from "react-native";
let key = require('./Config').key;

export const USER_KEY = "auth-key";

export const onSignOut = () => AsyncStorage.setItem("signedIn",'false');

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("signedIn")
      .then(res => {
          if (res == 'true') {
              resolve(true);
          } else {
              resolve(false);
          }
      })
      .catch(err => reject(err));
  });
};