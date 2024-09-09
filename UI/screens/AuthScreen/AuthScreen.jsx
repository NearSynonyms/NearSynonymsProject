import React from "react";
import { View, ImageBackground, SafeAreaView, Image } from "react-native";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { GoogleLoginButton } from "../../components/googleButton/GoogleLoginButton";
import { FacebookLoginButton } from "../../components/facebookButton/FacebookLoginButton";
import { s } from "./AuthScreen.style";
import { Txt } from "../../components/Txt/Txt";
import { usePreloadAssets } from "../../hooks/usePreloadAssets";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen({ navigation }) {
  useWarmUpBrowser();
  const { startOAuthFlow: startOAuthFlowGoogle } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startOAuthFlowFacebook } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onGoogleLoginPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlowGoogle();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const onFacebookLoginPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlowFacebook();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  const assetsForLoginScreen = [
    require("../../assets/Images/Login.png"),
    require("../../assets/Images/Logo.png"),
  ];
  const isReady = usePreloadAssets(assetsForLoginScreen);

  if (!isReady) {
    return null;
  }
  backgroundImg = assetsForLoginScreen[0];
  logo = assetsForLoginScreen[1];
  return (
    <ImageBackground
      resizeMode="cover"
      style={s.img_background}
      source={backgroundImg}
    >
      <SafeAreaView style={s.safe_area_view}>
        <View style={s.container}>
          <Image style={s.logo} source={logo} />
          <Txt style={s.welcome}>Welcome</Txt>
          <GoogleLoginButton
            styleView={s.viewBtn}
            onPress={onGoogleLoginPress}
          />
          <FacebookLoginButton onPress={onFacebookLoginPress} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
