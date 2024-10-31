import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, } from "react-native-reanimated";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
     
    ],
    [style]
  );

  return <AnimatedBlurView intensity={ interpolate(
    animatedIndex.value,
    [-1, 0],
    [0, 20],
    Extrapolation.CLAMP
  )} style={containerStyle} />;
};

export default CustomBackdrop;