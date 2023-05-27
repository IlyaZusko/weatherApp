import React, {useState, useCallback, useEffect} from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigation from './Navigate.js';

// SplashScreen.preventAutoHideAsync();

const fonts = () => Font.loadAsync({
    // Poppins Fonts
    "pop-reg": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "pop-med": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "pop-sem": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "pop-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "pop-exbold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    // Nunito Fonts
    "nun-reg": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "nun-med": require("./assets/fonts/Nunito/Nunito-Medium.ttf"),
    "nun-sem": require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
    "nun-bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    "nun-exbold": require("./assets/fonts/Nunito/Nunito-ExtraBold.ttf"),
  });

export default function App() {
  const [font, setFont] = useState(false);

  if(font) {
    return (
      <Navigation /> 
    );
  } else {  
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.warn} />
    ); 
  } 
}

