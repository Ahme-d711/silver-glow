import React from 'react';
import { View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type AdsPaginationProps = {
  length: number;
  animValue: SharedValue<number>;
};

type PaginationDotProps = {
  index: number;
  length: number;
  animValue: SharedValue<number>;
};

const DOT_WIDTH = 7;

function PaginationDot({ index, length, animValue }: PaginationDotProps) {
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [DOT_WIDTH, DOT_WIDTH * 2.8, DOT_WIDTH];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
    }

    return {
      width: interpolate(animValue.value, inputRange, outputRange, Extrapolate.CLAMP),
      opacity: interpolate(animValue.value, inputRange, [0.35, 1, 0.35], Extrapolate.CLAMP),
    };
  }, [animValue, index, length]);

  return (
    <Animated.View className="h-1.5 rounded-full mx-1 bg-primary" style={animStyle} />
  );
}

export function AdsPagination({ length, animValue }: AdsPaginationProps) {
  return (
    <View className="flex-row justify-center items-center mt-3">
      {Array.from({ length }, (_, index) => (
        <PaginationDot
          key={index}
          index={index}
          length={length}
          animValue={animValue}
        />
      ))}
    </View>
  );
}
