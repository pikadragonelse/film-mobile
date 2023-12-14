import { ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import VideoPlayer from "expo-video-player";
import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";

export type VideoPlayerCustom = { sourceURI: string };
export const VideoPlayerCustom = ({ sourceURI }: VideoPlayerCustom) => {
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const refVideo2 = useRef<any>(null);
  return (
    <VideoPlayer
      videoProps={{
        shouldPlay: true,
        resizeMode: ResizeMode.CONTAIN,
        source: {
          uri: sourceURI,
        },
        ref: refVideo2,
      }}
      style={{
        videoBackgroundColor: "black",
        height: inFullscreen2 ? Dimensions.get("window").width - 30 : 300,
        width: inFullscreen2
          ? Dimensions.get("window").height
          : Dimensions.get("window").width,
      }}
      fullscreen={{
        inFullscreen: inFullscreen2,
        enterFullscreen: async () => {
          setStatusBarHidden(true, "fade");
          setInFullsreen2(!inFullscreen2);
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
          );
          refVideo2.current.setStatusAsync({
            shouldPlay: true,
          });
        },
        exitFullscreen: async () => {
          setStatusBarHidden(false, "fade");
          setInFullsreen2(!inFullscreen2);
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.DEFAULT
          );
        },
      }}
    />
  );
};
