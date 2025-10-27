import React from "react";
import {WebView} from "react-native-webview";
import {Platform, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {router} from "expo-router";
const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: "https://m.naver.com"}}
        showsVerticalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          console.log("Home - request", request);

          if (
            request.url.startsWith("https://m.naver.com") ||
            request.mainDocumentURL?.startsWith("https://m.naver.com")
          ) {
            return true;
          }
          if (request.url != null && request.url.startsWith("https://")) {
            router.navigate({
              pathname: "browser",
            });
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
