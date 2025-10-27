import React, {useMemo, useRef, useState} from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import WebView from "react-native-webview";

const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "black",
  },
  urlContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  urlText: {
    color: "white",
  },
  loadingBarBackground: {
    height: 3,
    backgroundColor: "white",
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "green",
  },
});

const BrowserScreen = () => {
  const params = useLocalSearchParams();
  const initalUrl = params.initialUrl as string;
  const [url, setUrl] = useState(initalUrl);
  const urlTitle = useMemo(
    () => url.replace("https://", "").split("/")[0],
    [url],
  );

  const progressAnim = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}></Animated.View>
      </View>
      <WebView
        source={{uri: initalUrl}}
        onNavigationStateChange={event => {
          console.log(event);
          setUrl(event.url);
        }}
        onLoadProgress={event => {
          console.log(event.nativeEvent.progress);
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          console.log("onLoadEnd");
          progressAnim.setValue(0);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
